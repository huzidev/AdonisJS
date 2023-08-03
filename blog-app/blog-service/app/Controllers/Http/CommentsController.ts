import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Comment from "App/Models/Comment";
import User from "App/Models/User";
import { AddComment, EditComment } from "App/Validators/CommentValidator";

export default class CommentsController {
  public async add({ request, auth }: HttpContextContract) {
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
    try {
      const articleId = params.id;
      const response = await Comment.query()
            .where("article_id", articleId)
            .select("*");
      // const response = await Article.query().whereIn("id", query);
      console.log("response", response);
      return {
        message: "Comments fetched successfully",
        data: response
      };
    } catch (e) {
      throw e
    }
  }

  public async edit({ params, request }) {
    try {
      const body = await request.validate(EditComment);
      const comment: any = await Comment.findBy("id", params.id);
  
      comment.fill({ ...comment, ...body });
      comment.merge(body);
      await comment.save();

      return {
        message: "Comment updated successfully",
        status: 200
      }

    } catch (e) {
      throw e;
    }
  }

  public async delete({ params }: HttpContextContract) {
    const comment = await Comment.findBy("id", params.id);
    await comment?.delete();

    return {
      message: `Comment with id ${comment?.id} deleted successfully`,
      status: 200
    }
  }
}
