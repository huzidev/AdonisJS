import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { AddFavoriteArticle } from 'App/Validators/FavoriteArticleValidator';

export default class FavoriteArticlesController {
    public async add({ request }: HttpContextContract) {
        try {
            const body = await request.validate(AddFavoriteArticle);
        } catch (e) {
            throw e
        }
    }
}
