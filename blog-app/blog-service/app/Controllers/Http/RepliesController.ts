import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Reply from "App/Models/Reply";
import User from "App/Models/User";
import { AddReply, EditReply } from "App/Validators/ReplyValidator";

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
            // .preload('comment', (query) => query.where("id", commentId))
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

  public async getById({ params }: HttpContextContract) { 
    try {
      const reply= await Reply.findBy("id", params.id);
      if (!reply) {
        throw {
          message: `No Reply found by id ${params.id}`
        }
      } else {
        return {
          message: `Reply fetched successfully by id ${params.id}`,
          data: reply
        }
      }
    } catch (e) {
      throw e;
    }
  }

  public async edit({ params, request }) {
    try {
      const body = await request.validate(EditReply);
      const reply: any = await Reply.findBy("id", params.id);

      reply.fill({ ...reply, ...body });
      reply.merge(body);
      await reply.save();

      return {
        message: "Reply updated successfully",
        data: reply?.toObject()
      }

    } catch (e) {
      throw e;
    }
  }

  public async delete({ params }: HttpContextContract) {
    const response = await Reply.findBy("id", params.id);
    await response?.delete();

    return {
      message: `Reply with id ${response?.id} deleted successfully`,
      response
    }
  }
}
