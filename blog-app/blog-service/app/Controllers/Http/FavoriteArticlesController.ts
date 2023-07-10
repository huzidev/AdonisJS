import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Article from 'App/Models/Article';
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
        const query = FavoriteArticle.query()
            .where("user_id", userId)
            .select("article_id");
        const response = await Article.query().whereIn("id", query).paginate(params.page || 1, 5);
        return response;
    }

    public async remove({ params }: HttpContextContract) {
        try {
            const article = await FavoriteArticle.findBy("article_id", params.id);
            await article!.delete();
            return { message: `Article with id ${params.id} Deleted`, id: Number(params.id) };
        } catch (e) {
            throw e
        }
    }

}
