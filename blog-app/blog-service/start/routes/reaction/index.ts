import Route from '@ioc:Adonis/Core/Route';

export default function ArticlesRoutes() {
    const path = "ReactionsController";
    Route.group(() => {
        Route.get("/blog", `${path}.add`)
            .middleware("auth");
    }).prefix("/reaction")
}