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
            throw e;
        }
    }

    public async get({ params }: HttpContextContract) {
        try {
            const userId = params.id;
            const response = await Article.query()
            .join('favorite_articles as f', 'articles.id', '=', 'f.article_id')
            .select('*', 'f.article_id')
            .where('f.user_id', userId)
            .paginate(params.page || 1, 15)

            console.log("response", response);
            return response;
        } catch (e) {
            throw e;
        }
    }

    public async remove({ request }: HttpContextContract) {
        try {
            const body = await request.validate(RemoveFavoriteArticle);
            const user = await User.findBy("id", body.ownerId);
            const article = await FavoriteArticle.findBy("article_id", body.articleId);
            await article?.delete();
            return { message: `Blog by ${user?.username} removed from favorite list successfully!`, id: body.articleId };
        } catch (e) {
            throw e;
        }
    }

}
