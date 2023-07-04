import Route from '@ioc:Adonis/Core/Route';

export default function UsersRoutes() {
    const path = "UsersController";
    Route.group(() => {
        Route.get("/get/me", `${path}.getMe`).middleware("auth:any");
        Route.put("/edit/me", `${path}.update`)
            .middleware("auth")
            .where('id', /^[0-9]+$/); // while updating ownslef get the id of the loggedIn User
        Route.put("/edit/:id", `${path}.update`)
            .middleware('auth:admin')
            .where('id', /^[0-9]+$/);
        Route.get("/all", `${path}.getAllUser`);
        Route.get("/get/:id", `${path}.getById`).where("id", /^[0-9]+$/);;
    }).prefix('/user')
}       