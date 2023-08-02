import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Article from 'App/Models/Article';
import Comment from 'App/Models/Comment';
import User from 'App/Models/User';
import { AddComment } from 'App/Validators/CommentValidator';

export default class CommentsController {
    public async addComment({ request, auth }: HttpContextContract) {
        try {
            const body = await request.validate(AddComment);

            const { userId, articleId } = body;

            const userComment: any = User.findBy("id", userId);

            const article: any = Article.findBy("id", articleId);

            const blogOwner: any = User.findBy("id", article.ownerId);

            console.log("ARTICLES", article);
            
            await Comment.create(body);

            return {
                message: `Comment added successfully by ${userComment.username} on blog by ${blogOwner.username}`,
                status: 200,
                response: body
            }
        } catch (e) {
            throw e;
        }
    }
}
