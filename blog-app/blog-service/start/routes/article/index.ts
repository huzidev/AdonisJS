import Route from '@ioc:Adonis/Core/Route';

export default function ArticlesRoutes() {
    const path = "ArticlesController";
    Route.get("/articles", `${path}.view`); // .view is function created in app/controllers/ArticlesController.ts
}