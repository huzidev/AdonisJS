// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UsersController {
    public async getMe({ auth }: HttpContextContract) {
        return { data: auth.user?.toJSON() }
    }

    public async update({ request, params, auth }: HttpContextContract) {
        try {
            const userId = auth.user?.id
            let body;
            if (userId) {
                body = await request validator
            }
        } catch (e) {
            throw e
        }
    }
}
