import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { validator } from "@ioc:Adonis/Core/Validator";
import { articleFilters } from "App/Default/Filters";
import {
  blogsFetched,
  invalidURL,
  noArticle,
  noPermission,
} from "App/Default/Messages";
import Article from "App/Models/Article";
import User from "App/Models/User";
import Utils from "App/Utils";
import {
  BlogListFilters,
  CreateArticle,
  UpdateArticle,
} from "App/Validators/ArticleValidator";

// Controller used to call the functions created in routes here so routes won't get messed up
export default class ArticlesController {
  public async getBlogs({ params, request }: HttpContextContract) {
    try {
      const filters = await validator.validate({
        schema: BlogListFilters.schema,
        data: Utils.parseQS(request.qs(), ["sort"]),
      });

      const userId = params.id;
      const query = Article.query();

      // because for calling username filters we don't have username in articles table therefore created join statement
      // if user wanted to see allBlogs uploaded by him
      if (userId) {
        query.where("owner_id", userId);
      }

      const isSort = Object.keys(request.qs())[1];
      // to check if user tries to change method in URL which should be sort if user tries to change it then throw error
      // it is compulsory to put isSort !== "sort" inside isSort so it won't run every time rather it'll only runs when user called the FILTERS
      // we can't called !userFilters.includes(filterResultKey) here because for that we needs filters so if user changes the METHOD in URL from sort to something else
      // then filter will became undefined and the isSort won't work therefore created these two seprately
      if (isSort) {
        if (isSort !== "sort") {
          throw invalidURL;
        }
      }

      let filterResultKey;
      let filterResultValue;
      if (!!filters.sort) {
        filterResultKey = Object.keys(filters.sort!)[0];
        filterResultValue = Object.values(filters.sort!)[0];
        // so when user called the filter on main blogs page then don't run this query only run this join statement when filtersResultKey is username
        if (filterResultKey === "username") {
          query.join("users", "articles.owner_id", "users.id");
        }
        // filter for most recent and oldest will be according to createdAt therefore checking for createdAt only
        if (!articleFilters.includes(filterResultKey)) {
          throw invalidURL;
        }
      }

      const response = await query
        .withScopes((scope) => scope.filtersSort(filters))
        .paginate(params.page || 1, 15);
      if (params.page > response.lastPage) {
        throw {
          message: `Blogs page limit exceeds, Total pages are ${response.lastPage}`,
          status: 404,
        };
      }

      return {
        // so when user asked for filter then notifcation will be according to filter type
        message:
          !!filters.sort && filterResultValue === "desc"
            ? `Most recent ${blogsFetched}`
            : filterResultValue === "asc"
            ? `Oldest ${blogsFetched}`
            : // by default first letter is small of blogs as we are using the same message mutiple places therefore
              blogsFetched.charAt(0).toUpperCase() +
              blogsFetched.slice(1).toLocaleLowerCase(),
        data: response,
      };
    } catch (e) {
      throw {
        message: e.message.includes("E_VALIDATION_FAILURE")
          ? invalidURL.message
          : e.message,
      };
    }
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
        message: "Blog created successfully",
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
        data: article,
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
      if (!article) {
        throw noArticle;
        // isAdmin created in User Model
      }
      if (
        (article.ownerId !== auth.user?.id && !auth.user?.isAdmin()) ||
        !auth.user!.hasAccess(userRole)
      ) {
        throw noPermission;
      }
      // if (article.ownerId !== auth.user?.id && !auth.user?.isAdmin()) {
      //   throw noPermission;
      // }
      else if (
        body.title === article?.title &&
        body.content === article?.content
      ) {
        throw {
          message: "Can't update, values are same as of before",
          status: 400,
        };
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
