import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import { sameValues } from "App/Default/Messages";
import Comment from "App/Models/Comment";
import User from "App/Models/User";
import { AddComment, EditComment } from "App/Validators/CommentValidator";

export default class CommentsController {
  public async add({ request }: HttpContextContract) {
    try { 
      const body: any = await request.validate(AddComment);
      const data = await Comment.create(body);
      return {
        // when user add comment then parentId will be null but when user add reply then parentId will not be null
        message: `Yours ${body.parentId ? 'reply' : 'comment'} added successfully`,
        data
      };
    } catch (e) {
      throw e;
    }
  }

  public async getById({ params }: HttpContextContract) {
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

  public async getAllComments() {
    try {
      const response: any = await Database.from("comments")
        .select('article_id')
        .count('id as comment_count')
        .groupBy('article_id')
        // .orderBy('article_id', 'desc');
      
      return {
        message: "All comments fethced successfully",
        data: response,
      };
    } catch (e) {
      throw e;
    }
  }

  public async edit({ params, request, auth }) {
    try {
      const body = await request.validate(EditComment);
      const user: any = await User.findBy("id", body.userId);
      const comment: any = await Comment.findBy("id", params.id);

      const { content, parentId } = body;

      if (content === comment.content) {
        throw sameValues;
      }

      // only adding content: body.content otherwise it'll update userId as well if admin is updating some users id then due to validation userId it'll also update userId therefore 
      // put content: body.content sperately for updating comment
      comment.fill({ ...comment, content });
      comment.merge(content);
      await comment.save();
      
      return {
        message: `${user.id === auth.user.id ? 'Yours' : (user.username + `'s`)} ${parentId ? 'reply' : 'comment'} updated successfully`,
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
