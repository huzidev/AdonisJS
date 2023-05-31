// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from "App/Models/User";
import { CreateUser, SigninUser } from "App/Validators/UserValidator";

export default class UsersController {
    public async signUp({ request, auth }: HttpContextContract) {
        try {
            const body = await request.validate(CreateUser);
            // because we used new User() therefore use user.save() for saving at database
            const user = new User();
            user.fill(body);
            await user.save();
            const { token } = await auth.login(user);
            return {
                token,
                data: user, 
                message: "User registered successfully" 
            }
        } catch (e) {
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
            const body = await request.validate(SigninUser);
            const { token } = await auth.attempt(body?.email!, body.password);
            return {
                token,
                data: auth.user?.toJSON()
            }
        } catch (e) {
            console.log("Error", e);
        }
    }

    public async signOut({ auth }: HttpContextContract) {
        await auth.logout();
        return { message: "User logged out successfully" }
    }
}
