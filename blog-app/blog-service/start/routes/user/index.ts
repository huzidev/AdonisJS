import Route from '@ioc:Adonis/Core/Route';

export default function UsersRoutes() {
    const path = "UsersController";
    Route.group(() => {
        Route.get("/get/me", `${path}.getMe`).middleware("auth:any");
        Route.put("/edit/me", `${path}.update`).middleware("auth");
        Route.get("/all", `${path}.getAllUser`);
        Route.get("/get/:id", `${path}.getById`).where("id", /^[0-9]+$/);;
    }).prefix('/user')
}       