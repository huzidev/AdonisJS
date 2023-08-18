import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Comment from "App/Models/Comment";
import User from "App/Models/User";
import { AddComment, EditComment } from "App/Validators/CommentValidator";

export default class CommentsController {
  public async add({ request }: HttpContextContract) {
    try {
      const body: any = await request.validate(AddComment);

      console.log("Body", body);
        
      const { userId, parentId } = body;

      const user: any = await User.findBy("id", userId);
      
      const data = await Comment.create(body);

      return {
        message: `${parentId ? "Reply" : "Comment"} + "added successfully by" + ${user.username}`,
        data
      };
    } catch (e) {
      throw e;
    }
  }

  public async getAll({ params }: HttpContextContract) {
    try {
      const articleId = params.id;
      const response = await Comment.query()
          .where("articleId", articleId)
          .select('*');

      return {
        message: "Comments fetched successfully",
        data: response
      };
    } catch (e) {
      throw e
    }
  }

  public async getById({ params }: HttpContextContract) { 
    try {
      const comment = await Comment.findBy("id", params.id);
      if (!comment) {
        throw {
          message: `No comment found by id ${params.id}`
        }
      } else {
        return {
          message: `Comment fetched successfully by id ${params.id}`,
          data: comment
        }
      }
    } catch (e) {
      throw e;
    }
  }

  public async edit({ params, request, auth }) {
    try {
      const body = await request.validate(EditComment);
      const user: any = await User.findBy("id", body.userId);
      const comment: any = await Comment.findBy("id", params.id);

      // only adding content: body.content otherwise it'll update userId as well if admin is updating some users id then due to validation userId it'll also update userId therefore 
      // put content: body.content sperately for updating comment
      comment.fill({ ...comment, content: body.content });
      comment.merge(body.content);
      await comment.save();
      
      return {
        message: `${user.id === auth.user.id ? 'Yours' : (user.username + `'s`)} comment updated successfully`,
        data: comment?.toObject()
      }

    } catch (e) {
      throw e;
    }
  }

  public async delete({ params }: HttpContextContract) {
    const response = await Comment.findBy("id", params.id);
    await response?.delete();

    return {
      message: `Comment with id ${response?.id} deleted successfully`,
      response
    }
  }
}
