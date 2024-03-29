import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import { emailExist, invalidCredentials, noEmailFound, usernameExist } from 'App/Default/Messages';
import EmailVerificationCode from 'App/Models/EmailVerificationCode';
import ResetPasswordCode from 'App/Models/ResetPasswordCode';
import User from "App/Models/User";
import { AuthResetPassword, AuthResetPasswordSendCode, AuthSignIn, AuthSignUp, AuthVerifyEmailVerificationCode } from "App/Validators/AuthValidator";
import { DateTime } from 'luxon';

export default class AuthController {
    public async signUp({ request, auth }: HttpContextContract) {
        // Used to execute multiple database operations in single time like here we are operating users and EmailVerificationCode two different Tables
        const trx = await Database.transaction()
        try {
            const { isBlogger, ...body } = await request.validate(AuthSignUp);
            
            const user = new User();
            const verificationCode = new EmailVerificationCode();
            
            // because we used new User() therefore use user.save() for saving at database
            user.useTransaction(trx);
            // fill the user with the body received like username, email etc then user.save() to save the data in database
            user.fill(body);
            if (isBlogger) {
                user.role = "blogger"
            }
            // save user to Database
            await user.save();
            // after saving new user data to database calling refresh to get latest data from database
            await user.refresh();

            verificationCode.useTransaction(trx);
            verificationCode.userId = user.id;
            await verificationCode.save();

            // if no error occured then commit all the transaction other wise rollback the tranasction which created in catch(e) trx.rollback() rollback every changes created if any error occured like rollback in database
            await trx.commit();
            const { token } = await auth.login(user);
            return {
                token,
                data: auth.user?.toJSON(), 
                message: `User registered successfully, Verification code is ${verificationCode.code}`,
            }
        } catch (e) {
            trx.rollback()
            if (e.sqlMessage) {
                if (e.sqlMessage.includes("users.users_username_unique")) {
                    throw usernameExist
                } else if (e.sqlMessage.includes("users.users_email_unique")) {
                    throw emailExist
                } 
            }
            throw e
        }
    }

    public async signIn({ request, auth }: HttpContextContract) {
        try {
            const body = await request.validate(AuthSignIn);
            const { token } = await auth.attempt(body?.email!, body.password);
            let message = '';
            if (!auth.user?.isVerified) {
                const code = await EmailVerificationCode.findBy("user_id", auth.user?.id);
                code?.generateCode();
                await code?.save();
                message = `Verification code is ${code?.code}` 
            } else {
                message = "User loggedIn successfully"
            }
            return {
                message,
                token,
                data: auth.user?.toJSON()
            }
        } catch (e) {
            if (e.code === "E_INVALID_AUTH_PASSWORD" || e.code ===  "E_INVALID_AUTH_UID") {
                throw invalidCredentials
            }
            throw e
        }
    }

    // send Verification code
    public async verifyEmailSendCode({ auth }: HttpContextContract) {
        const code = await EmailVerificationCode.findBy('user_id', auth.user?.id!)
        // if user's details is not saved in EmailVerificationCode table this happened when admin creates a user
            if (!code) {
                const verificationCode = new EmailVerificationCode();
                verificationCode.userId = auth.user!.id;
                await verificationCode.save();
            }
        if (code?.updatedAt.plus({ minutes: 1 })! > DateTime.local()) {
            throw { message: `Code is already send, please wait a minute before requesting for new code`, status: 422 }
        }
        code?.generateCode()
        
        // if already a code is present but isExpired so new code will be appear instead of that old expired code in ours database when user asked for verifyEmailSendCode
        // if user is already verified then user can't asked for newVerification code because of middleware("auth:no_verify")
        await code?.save()
        return {
            message: `New verification code is ${code?.code}`,
        }
    }

    public async resetPasswordSendCode({ request }: HttpContextContract) {
        // email is necessary for resetPassword
        const body = await request.validate(AuthResetPasswordSendCode);
        // user must be active for reset password
        // using .first() because we knew data can't be null as for calling this request email is mandatory if no email then this won't even run if data can be null then firstOrFail
        const user = await User.query().where("email", body.email).where("isActive", true).first();
        if (!user) {
            throw noEmailFound
        }
        let verificationCode = await ResetPasswordCode.findBy("userId", user.id);

        if (!verificationCode) {
            // if No verificationCode then creates a new ResetPasswordCode record associated with the user's ID
            // resetPasswordCode is different as of verifyEmailCode because in verifyEmailCode Record will filled during signUp call
            verificationCode = await ResetPasswordCode.create({ userId: user.id })
        } else {
            // if user asked for new verification code before a minute
            verificationCode.generateCode();
            await verificationCode.save();
        }
        return {
            message: `Verification code is ${verificationCode?.code}`,
        }
    }

    public async resendResetPasswordCode({ request }: HttpContextContract) {
        // for resend password we are only receving email hence use that email to fetch user's id
        const body = await request.validate(AuthResetPasswordSendCode);
        // using first because we are receving array therefore
        const user = await User.query().where("email", body.email).where("isActive", true).first();
        // so if user tries to change email through URL
        if (!user) {
            throw noEmailFound
        }
        let verificationCode = await ResetPasswordCode.findBy("userId", user.id);
        if (
            verificationCode!.isActive &&
            verificationCode!.updatedAt.plus({ minute: 1 }) > DateTime.local()
        ) {
            throw { message: `Code is already send, please wait a minute before requesting for new code`, status: 422 }
        } else {
            verificationCode!.generateCode();
            await verificationCode!.save();
        }
        return {
            message: `New verification code is ${verificationCode?.code}`,
        }
    }

    // verify Verification code
    public async verifyEmailVerifyCode({ request, auth }: HttpContextContract) {
        const trx = await Database.transaction()
        try {
            const body = await request.validate(AuthVerifyEmailVerificationCode);
            
            let verificationCode = await EmailVerificationCode.query()
                .where('userId', auth.user!.id)
                .where('code', body.code) // verify the code from user with the code in EmailVerificationCode table
                .where('isActive', true)
                .first() 
                // in this case first is used because all the values from user WILL match then return the result and the result can't be null or NotFound
                // FirstOrFail() give exception when no matching rows are found firstOrFail() only used when we know that row CAN BE NULL or notFound

            if (!verificationCode) {
                throw { message: 'Invalid Code', status: 404 }
            }
            if (verificationCode.expiresAt < DateTime.local()) {
                throw { message: 'Expired code, Not valid anymore', status: 422 }
            }   
            
            // here we can't use verificationCode.user.useTransaction(trx) as we've in resetPassword because we haven't used preload here
            verificationCode.useTransaction(trx)
            verificationCode.isActive = false;
            // when verificationCode is used then it'll be changed to false
            auth.user!.useTransaction(trx)
            // after verification user isVerified will changed to true
            auth.user!.isVerified = true
            // Promise.all will wait for bith properties to be saved into database then proceeds further calling both seprately would cause error

            await Promise.all([auth.user?.save(), verificationCode.save()])
            await trx.commit();

            return { message: 'User verified successfully' }
        } catch (e) {
            await trx.rollback()
            throw e
        }
    }

    // resetPassword
    public async resetPassword({ request }: HttpContextContract) {
        // transaction ensures that either all operations succeed or none of them are committed
        const trx = await Database.transaction();
        try {
            const body = await request.validate(AuthResetPassword);
            let verificationCode = await ResetPasswordCode.query()
                .where("code", body.code)
                .where("isActive", true)
                // preload is working because in ResetPasswordCode model we've created a relation 
                // @belongsTo(() => User)
                //  public user: BelongsTo<typeof User>D
                // this allows preloads to make relationship with two tables and to be executed in a single query()
                .preload("user", (query) => query.where("isActive", true)) // using Preload here to check if user is Active or Not
                .first()
                
            if (!verificationCode || verificationCode?.user?.email !== body.email) {
                throw { message: 'Invalid Code', status: 404 }
            }
            if (verificationCode.expiresAt < DateTime.local()) {
                throw { message: 'Expired code, Not valid anymore', status: 422 }
            }
            verificationCode.useTransaction(trx);
            verificationCode.user.useTransaction(trx);

            verificationCode.isActive = false;
            //  user's password is updated with the new password provided in the request body
            verificationCode.user.password = body.password;

            await Promise.all([verificationCode.save(), verificationCode.user.save()])
            await trx.commit();
        
            return { message: "Password reset successfully" }
        } catch (e) {
            trx.rollback();
            throw e
        }
    }

    public async signOut({ auth }: HttpContextContract) {
        await auth.logout();
        return { message: "User logged out successfully" }
    }
}
