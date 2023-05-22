// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
    public async create() {
        try {
            
        } catch (e) {
            if (e.code === 'ER_DUP_ENTRY') {
                throw {
                message: 'Email already in use',
                status: 409,
                }
            }
            throw e
        }
    }
}
