import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Article from "App/Models/Article";
import Comment from "App/Models/Comment";
import User from "App/Models/User";
import { AddComment } from "App/Validators/CommentValidator";

export default class CommentsController {
  public async addComment({ request, auth }: HttpContextContract) {
    try {
      const body = await request.validate(AddComment);

      console.log("body", body);

      const { userId, articleId } = body;

        let user: any, article: any, ownerName: any;

            console.log("USER ID", userId);
            
                user = await User.findBy("id", userId);
                article = await Article.findBy("id", articleId);
                ownerName = await User.findBy("id", article.ownerId);

            

      await Comment.create(body);

      return {
        message: `Comment added successfully by ${user.username} on blog ${ownerName.username}`,
        status: 200,
        response: body
      };
    } catch (e) {
      throw e;
    }
  }
}
