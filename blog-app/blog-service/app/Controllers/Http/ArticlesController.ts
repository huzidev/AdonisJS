// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from "@ioc:Adonis/Lucid/Database";

// Controller used to clean the messed up data from routes

export default class ArticlesController {
    public async view() {
        const response = await Database.from("articles").select("*");
        return response;  
    }
}
