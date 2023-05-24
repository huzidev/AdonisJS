// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";
import { CreateUser, SigninUser } from "App/Validators/CreateUserValidator";

export default class UsersController {
    public async signUp({ request }) {
        try {
            const body = await request.validate(CreateUser);
            const userExist = await User.findBy("username", body.username);
            if (userExist) {
                throw {
                    message: "Username already exist",
                    status: 409
                }
            } else if (!userExist) {
                await User.create({ ...body });
                return {
                    data: body, 
                    message: "User registered successfully" 
                }
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

    public async signIn({ auth, request }) {
        const body = await request.validate(SigninUser);
        console.log("Login user", body);
        const username = body.username;
        const password = body.password;
        try {
            const result = await auth.use("web").attempt(username, password)
            return result;
        } catch (e) {
            console.log("Error", e);
        }
    }
}
