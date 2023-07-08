import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import FavoriteArticle from 'App/Models/FavoriteArticle';
import { AddFavoriteArticle } from 'App/Validators/FavoriteArticleValidator';

export default class FavoriteArticlesController {
    public async add({ request }: HttpContextContract) {
        try {
            const body = await request.validate(AddFavoriteArticle);
            await FavoriteArticle.create({...body})
        } catch (e) {
            throw e
        }
    }
}
