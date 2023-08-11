import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Reply from "App/Models/Reply";
import User from "App/Models/User";
import { AddReply } from "App/Validators/ReplyValidator";

export default class RepliesController {
  public async add({ request }: HttpContextContract) {
    try {
      const body = await request.validate(AddReply);

      const { userId } = body;

      const user: any = await User.findBy("id", userId);

      await Reply.create(body);

      return {
        message: `Reply added successfully by ${user.username}`,
        data: body,
      };
    } catch (e) {
      throw e;
    }
  }

  public async getAll({ params }: HttpContextContract) {
    try {
      const commentId = params.id;
      const response = await Reply.query()
            .where("comment_id", commentId)
            .select('*');
      // const response = await Article.query().whereIn("id", query); 
      return {
        message: "Replies fetched successfully",
        data: response
      };
    } catch (e) {
      throw e
    }
  }
}
