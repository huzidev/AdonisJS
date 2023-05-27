import Route from '@ioc:Adonis/Core/Route';

export default function UsersRoutes() {
    const path = "UsersController";
    Route.post("/sign_up", `${path}.signUp`);
    Route.post("/sign_in", `${path}.signIn`);
    Route.post("/sign_out", `${path}.signOut`);
}