import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Article from "App/Models/Article";
import User from "App/Models/User";
import { CreateArticle, UpdateArticle } from "App/Validators/ArticleValidator";

// Controller used to call the functions created in routes here so routes won't get messed up

const noArticle = { message: "No such article is found ", status: 404 };
const noPermission = { message: "You didn't have permission", status: 401 };
export default class ArticlesController {
  public async getBlogs({ params }: HttpContextContract) {
    const userId = params.id;
    const query = Article.query();

    // if user wanted to see allBlogs uploaded by him
    if (userId) {
      query.where("owner_id", userId);
    }
    const response = await query.paginate(params.page || 1, 5);
    return response;
  }

  public async addBlog({ request, auth }: HttpContextContract) {
    try {
      // body is receiving title, image, content as of request.body, we used request.validate instead of req.body
      const body = await request.validate(CreateArticle);
      const blog = await Article.create({
        ...body,
        ownerId: auth.user?.id,
      });
      
      // returning blog as data because blog contains all info like id, ownerId, title etc so when user add new blog then uploadedBy username error won't appear and with the ownerId we can fetch the user and shows the name of owner of the blog
      return {
        data: blog,
        message: "Blog created successfully"
      };
    } catch (e) {
      throw e;
    }
  }

  public async getById({ params }: HttpContextContract) {
    try {
      const article: any = await Article.findBy("slug", params.slug);
      let user;
      if (article) {
        // using .first() because we are receving array[]
        user = await User.query().where("id", article.ownerId).first();
      }
      if (!article) {
        throw noArticle;
      } 
      return {
        article,
        message: `Blog by ${user?.username} fetched successfully`,
      };
    } catch (e) {
      throw e;
    }
  }

  public async updateBlog({ request, auth, params }: HttpContextContract) {
    try {
      const body = await request.validate(UpdateArticle);
      const article = await Article.findBy("id", params.id);
      
      const userRole: any = auth.user?.role;

      console.log("User role", userRole);
      // const articleId: number = params.id;
      // if user didn't change any value and tries to update blog
      if (!auth.user!.hasAccess(userRole)) {
        throw {
          message: "Insufficient access, you do not have permission to perform this action",
          status: 401,
        };
      }
      if (body.title === article?.title && body.content === article?.content) {
        throw {
          message: "Can't update, values are same as of before",
          status: 401
        };
      }
      if (!article) {
        throw noArticle;
        // isAdmin created in User Model
      } else if (article.ownerId !== auth.user?.id && !auth.user?.isAdmin()) {
        throw noPermission;
      } else {
        // await Article.query().where("id", articleId).update(body);
        article.fill({ ...article, ...body });
        article.merge(body);
        await article.save();
        return {
          data: article,
          message: "Blog updated successfully",
        };
      }
    } catch (e) {
      throw e;
    }
  }

  public async deleteBlog({ auth, params }: HttpContextContract) {
    const article = await Article.findBy("id", params.id);
    if (!article) {
      throw noArticle;
    } else if (article.ownerId !== auth.user?.id && !auth.user?.isAdmin()) {
      throw noPermission;
    } else {
      await article.delete();
      // returning id because we'll call filter on ours redux store to updated the state after filter out the deleted blog with id
      return {
        message: `Blog with id ${params.id} deleted successfully`,
        id: Number(params.id),
      };
    }
  }
}
