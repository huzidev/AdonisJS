// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from "@ioc:Adonis/Lucid/Database";
import { CreateArticle, UpdateArticle } from "App/Validators/CreateArticleValidator";

// Controller used to call the functions created in routes here so routes won't get messed up

export default class ArticlesController {
    public async getBlogs() {
        const response = await Database.from("articles").select("*");
        return { data: response };  
    }

    public async addBlog({ request }) {
        // body is receiving title, image, content as of request.body, we used request.validate instead of req.body
        const body = await request.validate(CreateArticle);
        
        await Database.table("articles").insert({
            ...body,
            slug: Date.now()
        })
        return { 
            data: body, 
            message: "Article created successfully" 
        };
    }

    public async getById({ params }) {
        const article = await Database.from("articles").where("id", params.id).first(); // .first() to fetch first element of array so data won't be in array because only single article is fetching which will be in array by default
        return { data: article, message: "Blog fetched successfully" };
    }

    public async updateBlog({ request, params }) {
        const body = await request.validate(UpdateArticle);
        await Database.from("articles").where("id", params.id).update(body);
        return { 
            data: body, 
            message: "Article updated successfully" 
        };
    }

    public async deleteBlog({ params }) {
        await Database.from("articles").where("id", params.id).delete();
        return { message: `Article ${params.id} Deleted` }
    }    
}
