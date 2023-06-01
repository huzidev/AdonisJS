import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Article from "App/Models/Article";
import { CreateArticle, UpdateArticle } from "App/Validators/ArticleValidator";

// Controller used to call the functions created in routes here so routes won't get messed up

const noArticle = { message: "Article not found", status: 404 }
export default class ArticlesController {
    public async getBlogs() {
        const response = await Article.all();
        return { data: response };  
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

    public async getById({ params }) {
        try {
            const article = await Article.findBy("slug", params.slug);
            console.log("params", params.slug);
        // const { title, content } = article;
        return { 
            data: article, 
            message: "Article fetched successfully" 
        }
        } catch (e) {
            throw e
        }
    }

    public async updateBlog({ request, params }) {
        const body = await request.validate(UpdateArticle);
        const blog = await Article.findBy("id", params.id);
        if (!blog) {
            throw {
                message: 'No Blog found by id ' + params.id,
                status: 404,
            }
        } else {
            await Article.query().where("id", params.id).update(body);
            return { 
                data: body, 
                message: "Article updated successfully" 
            };
        }
    }

    public async deleteBlog({ params }) {
        const article = await Article.findBy("id", params.id);
        if (!article) {
            throw noArticle
        }
        await article.delete();
        return { message: `Article ${params.id} Deleted` };
    }    
}
