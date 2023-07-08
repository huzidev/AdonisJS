import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import FavoriteArticle from 'App/Models/FavoriteArticle';
import { AddFavoriteArticle } from 'App/Validators/FavoriteArticleValidator';

export default class FavoriteArticlesController {
    public async add({ request }: HttpContextContract) {
        try {
            const body = await request.validate(AddFavoriteArticle);
            await FavoriteArticle.create({...body});
            return { 
                data: body, 
                message: "Article added to favorite successfully!" 
            };
        } catch (e) {
            throw e
        }
    }

    public async get({ params }: HttpContextContract) {
        const userId = params.id;
    }
}
