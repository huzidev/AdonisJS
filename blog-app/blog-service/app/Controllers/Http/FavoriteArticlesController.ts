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

  // public async get({ params }: HttpContextContract) {
  //   try {
  //     const userId = params.id;
  //     const response = Article.query()
  //       .join("favorite_articles as f", "articles.id", "=", "f.article_id")
  //       .select("articles.*")
  //       .where("f.user_id", userId);
  //     if (params.page) {
  //       return await response.paginate(params.page, 15);
  //     } else {
  //       return await response;
  //     }
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  
  public async get({ params }: HttpContextContract) {
    try {
      const { articleId, id } = params;
      
      const query = Article.query().join(
        "favorite_articles as f",
        "articles.id",
        "=",
        "f.article_id"
      );

      // if user clicked on a blogView page then there will be articleId in params
      let response;
      if (params.articleId) {
        response = await query.where("f.user_id", id).andWhere("article_id", articleId).first();
      }
      // if user clicked on ViewProfile or on some other user profile then their will be no aritcleId in params 
      else {
        query.select("*").where("f.user_id", id);
        if (params.page) {
          response = await query.paginate(params.page || 1, 15);
        } else {
          response = await query;
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
