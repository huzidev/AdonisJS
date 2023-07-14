import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Article from "App/Models/Article";
import User from 'App/Models/User';
import { CreateArticle, UpdateArticle } from "App/Validators/ArticleValidator";

// Controller used to call the functions created in routes here so routes won't get messed up

const noArticle = { message: "No such article is found ", status: 404 }
const noPermission = { message: "You didn't have permission", status: 401 }
export default class ArticlesController {
    public async getBlogs({ params }: HttpContextContract) {
            const userId = params.id;
            const query = Article.query();
    
            // if user wanted to see allBlogs uploaded by him
            if (userId) {
                query.where('owner_id', userId);
            }
            const response = await query.paginate(params.page || 1, 5);
            return response;
    }
    
    public async addBlog({ request, auth }: HttpContextContract) {
        try {
            // body is receiving title, image, content as of request.body, we used request.validate instead of req.body
            const body = await request.validate(CreateArticle);
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
            // using .first() because we are receving array[]
            let user;
            if (article) {
                user = await User.query().where("id", article!.ownerId).first();
            }
            if (!article) {
                throw noArticle
            } else {
                return { 
                    article, 
                    message: `Blog by ${user?.username} fetched successfully`
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
            // isAdmin created in User Model
            } else if (article.ownerId !== auth.user?.id && !auth.user?.isAdmin()) {
                throw noPermission
            } else {
                // await Article.query().where("id", articleId).update(body);
                article.fill({ ...article, ...body });
                article.merge(body);
                await article.save();
                return { 
                    data: article,
                    message: "Blog updated successfully" 
                }
            }
        } catch (e: any) {
            throw e
        }
    }

    public async deleteBlog({ auth, params }: HttpContextContract) {
        const article = await Article.findBy("id", params.id);
        if (!article) {
            throw noArticle
        } else if (article.ownerId !== auth.user?.id && !auth.user?.isAdmin()) {
            throw noPermission
        } 
        else {
            await article.delete();
            return { message: `Article with id ${params.id} Deleted`, id: Number(params.id) };
        }
    }    
}
