import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Article from 'App/Models/Article';
import FavoriteArticle from 'App/Models/FavoriteArticle';
import User from 'App/Models/User';
import { AddFavoriteArticle, RemoveFavoriteArticle } from 'App/Validators/FavoriteArticleValidator';

export default class FavoriteArticlesController {
    public async add({ request }: HttpContextContract) {
        try {
            const body = await request.validate(AddFavoriteArticle);
            const { userId, articleId } = body;
            
            // for owner of blog info so we can get owner name and then show the owner name in notification
            const user = await User.findBy("id", body.ownerId);
            
            await FavoriteArticle.create({articleId, userId});
            return { 
                data: body, 
                message: `Blog by ${user?.username} added to favorite list successfully!` 
            };
        } catch (e) {
            throw e
        }
    }

    public async get({ params }: HttpContextContract) {
        const userId = params.id;
        const query = FavoriteArticle.query()
            .where("user_id", userId)
            .select("article_id");
        const response = await Article.query().whereIn("id", query).paginate(params.page || 1, 10);
        return response;
    }

    public async remove({ request }: HttpContextContract) {
        try {
            const body = await request.validate(RemoveFavoriteArticle);
            const user = await User.findBy("id", body.ownerId);
            console.log("BODY", body);
            const article = await FavoriteArticle.findBy("article_id", body.articleId);
            await article?.delete();
            return { message: `Blog by ${user?.username} removed from favorite list successfully!`, id: body.articleId };
        } catch (e) {
            throw e
        }
    }

}
