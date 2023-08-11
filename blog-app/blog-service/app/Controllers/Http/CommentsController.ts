import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Comment from "App/Models/Comment";
import User from "App/Models/User";
import { AddComment, EditComment } from "App/Validators/CommentValidator";

export default class CommentsController {
  public async add({ request }: HttpContextContract) {
    try {
      const body = await request.validate(AddComment);

      const { userId } = body;

      const user: any = await User.findBy("id", userId);
      
      await Comment.create(body);

      return {
        message: `Comment added successfully by ${user.username}`,
        data: body
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
            .select('*');

      const replies = await Database.from("comments")
        .join('replies as r', 'comments.id', '=', 'r.comment_id')
        .count('r.comment_id as Total')
        
      // const response = await Article.query().whereIn("id", query); 
      return {
        message: "Comments fetched successfully",
        data: response,
        replies
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

  public async edit({ params, request }) {
    try {
      const body = await request.validate(EditComment);
      const comment: any = await Comment.findBy("id", params.id);

      comment.fill({ ...comment, ...body });
      comment.merge(body);
      await comment.save();

      return {
        message: "Comment updated successfully",
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
