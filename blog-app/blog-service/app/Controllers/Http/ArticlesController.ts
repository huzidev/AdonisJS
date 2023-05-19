// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from "@ioc:Adonis/Lucid/Database";

// Controller used to call the functions created in routes here so routes won't get messed up

export default class ArticlesController {
    public async view() {
        const response = await Database.from("articles").select("*");
        return response;  
    }
}
