import Route from '@ioc:Adonis/Core/Route';

export default function UsersRoutes() {
    const path = "UsersController";
    Route.group(() => {
        Route.get("/get/me", `${path}.getMe`).middleware("auth");
        Route.put("/edit/me", `${path}.update`).middleware("auth");
        Route.put("/all", `${path}.getAllUser`);
    }).prefix('/user')
}       