import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Article from "App/Models/Article";
import { CreateArticle, UpdateArticle } from "App/Validators/CreateArticleValidator";

// Controller used to call the functions created in routes here so routes won't get messed up

const noArticle = { message: "Article not found", status: 404 }
export default class ArticlesController {
    public async getBlogs() {
        const response = await Article.all();
        return { data: response };  
    }

    public async addBlog({ request, auth }: HttpContextContract) {
        // body is receiving title, image, content as of request.body, we used request.validate instead of req.body
        const body = await request.validate(CreateArticle);
        await Article.create({ 
            ...body,
            owner_id: auth.user?.id 
        });
        return { 
            data: body, 
            message: "Article created successfully" 
        };
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
            console.log("Error", e);
        }
    }

    public async updateBlog({ request, params }) {
        const body = await request.validate(UpdateArticle);
        await Article.query().where("id", params.id).update(body);
        return { 
            data: body, 
            message: "Article updated successfully" 
        };
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
