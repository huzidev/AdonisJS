import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Article from "App/Models/Article";
import { CreateArticle, UpdateArticle } from "App/Validators/ArticleValidator";

// Controller used to call the functions created in routes here so routes won't get messed up

const noArticle = { message: "No Article found by id ", status: 404 }
const noPermission = { message: "You didn't have permission", status: 401 }
export default class ArticlesController {
    public async getBlogs({ params }: HttpContextContract) {
        const response = await Article.query().paginate(params.page || 1, 5);
        return response;
    }

    public async addBlog({ request, auth }: HttpContextContract) {
        try {
            // body is receiving title, image, content as of request.body, we used request.validate instead of req.body
            const body = await request.validate(CreateArticle);
            console.log('b', body);
            console.log("auth", auth);
            await Article.create({ 
                ...body,
                ownerId: auth.user?.id
            });
            return { 
                data: body, 
                message: "Article created successfully" 
            };
        } catch (e) {
          throw e
        }
    }
        
    public async getById({ params }: HttpContextContract) {
        try {
            const article = await Article.findBy("slug", params.slug);
            console.log("article", article);
            if (!article) {
                throw noArticle
            } else {
                return { 
                    data: article, 
                    message: "Article fetched successfully" 
                }
            }
        } catch (e) {
            throw e
        }
    }

    public async updateBlog({ request, auth, params }: HttpContextContract) {
        try {
            const body = await request.validate(UpdateArticle);
            const article = await Article.findBy("id", params.id);
            // const articleId: number = params.id;
            if (!article) {
                throw noArticle
            } else if (article.ownerId !== auth.user?.id) {
                throw noPermission
            } else {
                // await Article.query().where("id", articleId).update(body);
                article.fill({ ...article, ...body });
                await article.save();
                return { 
                    data: body, 
                    message: "Article updated successfully" 
                }
            }
        } catch (e) {
            throw e
        }
    }

    public async deleteBlog({ auth, params }: HttpContextContract) {
        const article = await Article.findBy("id", params.id);
        if (!article) {
            throw noArticle
        } else if (article.ownerId !== auth.user?.id) {
            throw noPermission
        } 
        else {
            await article.delete();
            return { message: `Article with id ${params.id} Deleted`, id: Number(params.id) };
        }
    }    
}
