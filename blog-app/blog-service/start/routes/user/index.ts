import Route from '@ioc:Adonis/Core/Route';

export default function ArticlesRoutes() {
    const path = "UsersController";
    Route.post("/signup", `${path}.create`);
}