// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { UserUpdate } from 'App/Validators/UserValidator';

export default class UsersController {
    public async getMe({ auth }: HttpContextContract) {
        return { data: auth.user?.toJSON() }
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
