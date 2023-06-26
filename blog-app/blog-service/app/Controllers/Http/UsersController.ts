// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import { UserUpdate } from 'App/Validators/UserValidator';

export default class UsersController {
    public async getMe({ auth }: HttpContextContract) {
        return { data: auth.user?.toJSON() }
    }

    public async update({ request, auth }: HttpContextContract) {
        try {
            const userId: number | undefined = auth.user?.id;
            let body;
            if (userId) {
                body = await request.validate(UserUpdate);
            }
            if (!body) {
                throw {
                    message: 'Bad request',
                    status: 400
                }
            }
            const user = await User.findBy("id", userId);
            if (!user) {
                throw {
                    message: 'User not found',
                    status: 404
                }
            } else {
                await User.query().where("id", userId!).update(body);
                return { message: 'User updated successfully', data: user }
            }
        } catch (e) {
            throw e
        }   
    }
}
