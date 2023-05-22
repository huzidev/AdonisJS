import Route from '@ioc:Adonis/Core/Route';

export default function ArticlesRoutes() {
    const path = "UsersController";
    Route.get("/articles", `${path}.getBlogs`);
}