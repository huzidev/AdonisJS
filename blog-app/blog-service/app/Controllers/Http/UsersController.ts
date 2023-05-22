// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";
import { CreateUser } from "App/Validators/CreateUserValidator";

export default class UsersController {
    public async create({ request }) {
        try {
            const body = await request.validate(CreateUser);
            await User.create({ ...body });
            return {
                data: body, 
                message: "User registered successfully" 
            }
        } catch (e) {
            if (e.code === "ER_DUP_ENTRY") {
                throw {
                message: "Email already in use",
                status: 409,
                }
            }
            throw e
        }
    }
}
