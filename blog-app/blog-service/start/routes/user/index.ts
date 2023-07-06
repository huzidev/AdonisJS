import Route from "@ioc:Adonis/Core/Route";

export default function UsersRoutes() {
  const path = "UsersController";
  Route.group(() => {
    Route.get("/get/me", `${path}.getMe`).middleware("auth:any");
    Route.put("/edit/me", `${path}.update`)
      .middleware("auth")
      .where("id", /^[0-9]+$/); // while updating ownslef get the id of the loggedIn User
    Route.put("/edit/:id", `${path}.update`)
      .middleware("auth:admin")
      .where("id", /^[0-9]+$/);
    Route.get("/list", `${path}.getAllUser`);
    Route.get("/list/:page", `${path}.getAllUser`)
      .where("page", /^[0-9]+$/)
      .middleware("auth:admin");
    Route.post("/create", `${path}.create`).middleware("auth:admin");
    Route.get("/get/:id", `${path}.getById`).where("id", /^[0-9]+$/);
  }).prefix("/user");
}
