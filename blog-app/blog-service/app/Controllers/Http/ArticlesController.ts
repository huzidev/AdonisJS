// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from "@ioc:Adonis/Lucid/Database";

// Controller used to call the functions created in routes here so routes won't get messed up

export default class ArticlesController {
    public async getBlogs() {
        const response = await Database.from("articles").select("*");
        return { data: response };  
    }

    public async addBlog({ request }) {
        const { title, image, content } = request.body();
        await Database.table("articles").insert({
            title,
            image,
            content,
            slug: Date.now()
        })
        return { data: request.body() }
    }
}
