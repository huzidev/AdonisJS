import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import EmailVerificationCode from 'App/Models/EmailVerificationCode';
import User from "App/Models/User";
import { AuthSignIn, AuthSignUp } from "App/Validators/AuthValidator";

export default class AuthController {
    public async signUp({ request, auth }: HttpContextContract) {
        // Used to execute multiple database operations in single time
        const trx = await Database.transaction()
        try {
            const body = await request.validate(AuthSignUp);
            const user = new User();
            const verificationCode = new EmailVerificationCode()
            console.log("body", {...body});
            
            // because we used new User() therefore use user.save() for saving at database
            user.useTransaction(trx)
            // fill the user with the body received like username, email etc then user.save() to save the data in database
            user.fill(body);
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

    public async signOut({ auth }: HttpContextContract) {
        await auth.logout();
        return { message: "User logged out successfully" }
    }
}
