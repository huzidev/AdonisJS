import Route from '@ioc:Adonis/Core/Route';

export default function UsersRoutes() {
    const path = "UsersController";
    Route.post("/signup", `${path}.signup`);
    Route.post("/signin", `${path}.signin`);
}