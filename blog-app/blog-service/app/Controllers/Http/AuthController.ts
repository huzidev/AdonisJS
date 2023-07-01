import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import EmailVerificationCode from 'App/Models/EmailVerificationCode';
import User from "App/Models/User";
import { AuthSignIn, AuthSignUp, AuthVerifyEmailVerificationCode } from "App/Validators/AuthValidator";
import { DateTime } from 'luxon';

export default class AuthController {
    public async signUp({ request, auth }: HttpContextContract) {
        // Used to execute multiple database operations in single time
        const trx = await Database.transaction()
        try {
            const { isBlogger, ...body } = await request.validate(AuthSignUp);
            const user = new User();
            const verificationCode = new EmailVerificationCode()
            console.log("body", {...body});
            
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
        const code = await EmailVerificationCode.findBy('user_id', auth.user?.id!)
        if (code?.updatedAt.plus({ minutes: 1 })! > DateTime.local()) {
            throw { message: 'Please wait a minute before sending the code again', status: 422 }
        }
        code?.generateCode()
        console.log("verification code is", code);
        
        await code?.save()

        return {
            message: 'Verification code send',
        }
    }

    public async verifyEmailVerifyCode({ request, auth }: HttpContextContract) {
        const trx = await Database.transaction()
        try {
        const body = await request.validate(AuthVerifyEmailVerificationCode)
        const verificationCode = await EmailVerificationCode.query()
            .where('userId', auth.user!.id)
            .where('code', body.code)
            .where('isActive', true)
            .first()

        if (!verificationCode) {
            throw { message: 'Invalid Code', status: 404 }
        }
        if (verificationCode.expiresAt < DateTime.local()) {
            throw { message: 'Expired code, Not valid anymore', status: 422 }
        }
        verificationCode.useTransaction(trx)
        verificationCode.isActive = false
        auth.user!.useTransaction(trx)
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
