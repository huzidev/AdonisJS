// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UsersController {
    public async getMe({ auth }: HttpContextContract) {
        console.log("auth", auth.user);
        return { data: auth.user?.toJSON() }
    }
}
