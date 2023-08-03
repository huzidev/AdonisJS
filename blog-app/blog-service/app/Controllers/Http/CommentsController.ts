import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Comment from "App/Models/Comment";
import User from "App/Models/User";
import { AddComment, EditComment } from "App/Validators/CommentValidator";

export default class CommentsController {
  public async addC({ request, auth }: HttpContextContract) {
    try {
      const body = await request.validate(AddComment);

      console.log("body", body);

      const { userId, articleId } = body;


      console.log("USER ID", userId);

      const user: any = await User.findBy("id", userId);

      await Comment.create(body);

      return {
        message: `Comment added successfully by ${user.username} `,
        status: 200,
        response: body,
      };
    } catch (e) {
      throw e;
    }
  }

  public async getAll({ params }: HttpContextContract) {
    const articleId = params.id;
    const response = Comment.query()
          .where("article_id", articleId)
          .select("*");
    // const response = await Article.query().whereIn("id", query);
    return response;
  }

  public async edit({ params, request }) {
    try {
      const body = await request.validate(EditComment);
      const comment: any = await Comment.findBy("id", params.id);
  
      comment.fill({ ...comment, ...body });
      comment.merge(body);
      await comment.save();
    } catch (e) {
      throw e;
    }
  }
}
