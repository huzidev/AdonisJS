// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import { UserUpdate } from 'App/Validators/UserValidator';

export default class UsersController {
    public async getMe({ auth }: HttpContextContract) {
        return { data: auth.user?.toJSON() }
    }

    public async getAllUser() {
        const response = await User.all();
        return { message: "All Users fetched successfully", data: response }
    }

    public async getById({ params }: HttpContextContract) {
        try {
            const user = await User.findBy("slug", params.slug);
            if (!user) {
                throw { message: "No Article found by id", status: 404 }
            } else {
                return { 
                    data: article, 
                    message: "Article fetched successfully" 
                }
            }
        } catch (e) {
            throw e
        }
    }

    public async update({ request, auth }: HttpContextContract) {
        try {
            const body = await request.validate(UserUpdate);
            // once use merge then call the save method
            auth.user?.merge(body)
            auth.user?.save();
            return { message: 'User updated successfully', data: auth.user?.toObject() }
        } catch (e) {
            throw e
        }   
    }
}
