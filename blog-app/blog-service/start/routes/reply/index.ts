import Route from "@ioc:Adonis/Core/Route";

export default function ReplyRoutes() {
  const path = "RepliesController";
  Route.group(() => {
    Route.post("/add", `${path}.add`)
      .middleware("auth");
    Route.get("/get_all/:id", `${path}.getAll`)
      .where("id", /^[0-9]+$/);
    Route.get("/get/:id", `${path}.getById`)
      .where("id", /^[0-9]+$/)
      .middleware("auth");
    Route.put("/edit/:id", `${path}.edit`)
      .where("id", /^[0-9]+$/)
      .middleware("auth");
    Route.delete("/delete/:id", `${path}.delete`)
      .where("id", /^[0-9]+$/)
      .middleware("auth");
  }).prefix("/reply");
}
