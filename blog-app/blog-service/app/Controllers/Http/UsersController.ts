// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { UserUpdate } from 'App/Validators/UserValidator';

export default class UsersController {
    public async getMe({ auth }: HttpContextContract) {
        return { data: auth.user?.toJSON() }
    }

    public async update({ request, params, auth }: HttpContextContract) {
        try {
            const userId = auth.user?.id;
            let body;
            if (userId) {
                body = await request.validate(UserUpdate);
            }
            if (!body) {
                throw {
                message: 'Bad request',
                status: 400,
                }
            }
        } catch (e) {
            throw e
        }
    }
}
