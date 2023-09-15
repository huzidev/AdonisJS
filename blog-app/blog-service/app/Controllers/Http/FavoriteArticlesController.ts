import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Article from "App/Models/Article";
import FavoriteArticle from "App/Models/FavoriteArticle";
import User from "App/Models/User";
import {
  AddFavoriteArticle,
  RemoveFavoriteArticle,
} from "App/Validators/FavoriteArticleValidator";

export default class FavoriteArticlesController {
  public async add({ request }: HttpContextContract) {
    try {
      const body = await request.validate(AddFavoriteArticle);
      const { userId, articleId } = body;

      // for owner of blog info so we can get owner name and then show the owner name in notification
      const user = await User.findBy("id", body.ownerId);
      // to get the details of the article that has been added to favorite blogs
      const article = await Article.findBy("id", body.articleId);

      await FavoriteArticle.create({ articleId, userId });
      return {
        data: article,
        message: `Blog by ${user?.username} added to favorite list successfully!`,
      };
    } catch (e) {
      throw e;
    }
  }

  public async get({ params }: HttpContextContract) {
    try {
      const { articleId, id } = params;
      
      const query = Article.query().join(
        "favorite_articles as f",
        "articles.id",
        "=",
        "f.article_id"
      )
      .where("f.user_id", id);
      let response;
      // if user clicked on a blogView page then there will be articleId in params
      if (params.articleId) {
        response = await FavoriteArticle.query().select('article_id as id').where('user_id', id).andWhere('article_id', articleId).first();
      } else {
        if (params.page) {
          response = await query.select("*", "articles.id").paginate(params.page || 1, 15);
        } else {
          response = await query.select("articles.id");
        }
      }

      return {
        response,
        message: `${
          params.articleId
            ? `Blog by id ${params.articleId} `
            : params.page
            ? `Yours all blogs list`
            : "Yours blogs"
        } fetched successfully`,
      };
    } catch (e) {
      throw e;
    }
  }	

  public async remove({ request }: HttpContextContract) {
    try {
      const body = await request.validate(RemoveFavoriteArticle);
      const user = await User.findBy("id", body.ownerId);
      const article = await FavoriteArticle.query()
        .where("article_id", body.articleId)
        .andWhere("userId", body.userId)
        .first();
      await article?.delete();
      return {
        message: `Blog by ${user?.username} removed from favorite list successfully!`,
        id: body.articleId,
      };
    } catch (e) {
      throw e;
    }
  }
}
