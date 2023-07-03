import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import EmailVerificationCode from 'App/Models/EmailVerificationCode';
import User from "App/Models/User";
import { AuthSignIn, AuthSignUp, AuthVerifyEmailVerificationCode } from "App/Validators/AuthValidator";
import { DateTime } from 'luxon';

export default class AuthController {
    public async signUp({ request, auth }: HttpContextContract) {
        // Used to execute multiple database operations in single time like here we are operating users and EmailVerificationCode two different Tables
        const trx = await Database.transaction()
        try {
            const { isBlogger, ...body } = await request.validate(AuthSignUp);
            console.log("body", body);
            
            const user = new User();
            const verificationCode = new EmailVerificationCode()
            
            // because we used new User() therefore use user.save() for saving at database
            user.useTransaction(trx)
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
            console.log("VERIFICATION CODE IS", verificationCode.code);
            
            return {
                token,
                data: user, 
                message: "User registered successfully" 
            }
        } catch (e) {
            trx.rollback()
            if (e.code === "ER_DUP_ENTRY") {
                throw {
                    message: "User already exist",
                    status: 409
                }
            }
            throw e
        }
    }

    public async signIn({ request, auth }: HttpContextContract) {
        try {
            const body = await request.validate(AuthSignIn);
            const { token } = await auth.attempt(body?.email!, body.password);
            return {
                token,
                data: auth.user?.toJSON()
            }
        } catch (e) {
            throw e
        }
    }

    public async verifyEmailSendCode({ auth }: HttpContextContract) {
        console.log("auth id", auth.user?.id);
        const code = await EmailVerificationCode.findBy('user_id', auth.user?.id!)
        if (code?.updatedAt.plus({ minutes: 1 })! > DateTime.local()) {
            throw { message: 'Please wait a minute before sending the code again', status: 422 }
        }
        code?.generateCode()
        console.log("verification code is", code?.code);
        
        // if already a code is present but isExpired so new code will be appear instead of that old expired code in ours database when user asked for verifyEmailSendCode
        // if user is already verified then user can't asked for newVerification code because of middleware("auth:no_verify")
        await code?.save()

        return {
            message: 'Verification code send',
            data: code?.code
        }
    }

    public async verifyEmailVerifyCode({ request, auth }: HttpContextContract) {
        const trx = await Database.transaction()
        try {
            const body = await request.validate(AuthVerifyEmailVerificationCode)
            console.log("body", body);
            
            const verificationCode = await EmailVerificationCode.query()
                .where('userId', auth.user!.id)
                .where('code', body.code) // verify the code from user with the code in EmailVerificationCode table
                .where('isActive', true)
                .first() 
                // in this case first is used because all the values WILL match then return the result and the result can't be null or NotFound
                // FirstOrFail() give exception when no matching rows are found firstOrFail() only used when we know that row can be null or notFound

            if (!verificationCode) {
                throw { message: 'Invalid Code', status: 404 }
            }
            if (verificationCode.expiresAt < DateTime.local()) {
                throw { message: 'Expired code, Not valid anymore', status: 422 }
            }   
            verificationCode.useTransaction(trx)
            // when verificationCode is used then it'll be changed to false
            verificationCode.isActive = false
            auth.user!.useTransaction(trx)
            // after verification user isVerified will changed to true
            auth.user!.isVerified = true
            // Promise.all will wait for bith properties to be saved into database then proceeds further calling both seprately would cause error
            await Promise.all([auth.user?.save(), verificationCode.save()])
            await trx.commit()

            return { message: 'Code verified successfully' }
        } catch (e) {
            await trx.rollback()
            throw e
        }
    }

    public async signOut({ auth }: HttpContextContract) {
        await auth.logout();
        return { message: "User logged out successfully" }
    }
}
