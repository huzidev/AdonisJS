import Route from '@ioc:Adonis/Core/Route';

export default function ArticlesRoutes() {
    const path = "ReactionsController";
    Route.group(() => {
        Route.get("/blog/:id", `${path}.add`)
            .where("id", /^[0-9]+$/);        
    }).prefix("/reaction")
}