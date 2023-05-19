// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from "@ioc:Adonis/Lucid/Database";
import { CreateArticle } from "App/Validators/CreateArticleValidator";

// Controller used to call the functions created in routes here so routes won't get messed up

export default class ArticlesController {
    public async getBlogs() {
        const response = await Database.from("articles").select("*");
        return { data: response };  
    }

    public async addBlog({ request }) {
        // body is receiving title, image, content as of request.body
        const body = await request.validate(CreateArticle);
        console.log("what is body", body);
        
        await Database.table("articles").insert({
            ...body,
            slug: Date.now()
        })
        return { data: body, message: "Article created successfully" }
    }

    public async getById({ params }) {
        const article = await Database.from("articles").where("id", params.id).first() // .first() to fetch first element of array so data won't be in array because only single article is fetching which will be in array by default
        console.log("current article id is", params.id);
        return { data: article }
    }

    public async updateBlog({ params }) {
        const articleId: number = params.id;
        console.log("Current ID", articleId);
    }
}
