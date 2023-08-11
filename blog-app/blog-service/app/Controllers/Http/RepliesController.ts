import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Reply from 'App/Models/Reply';
import User from 'App/Models/User';

export default class RepliesController {
    public async add({ request }: HttpContextContract) {
    try {
      const body = await request.validate(AddComment);

      const { userId } = body;

      const user: any = await User.findBy("id", userId);
      
      await Reply.create(body);

      return {
        message: `Reply added successfully by ${user.username}`,
        data: body
      };
    } catch (e) {
      throw e;
    }
}
