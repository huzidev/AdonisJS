import Route from "@ioc:Adonis/Core/Route";

export default function CommentRoutes() {
  const path = "CommentsController";
  Route.group(() => {
    Route.post("/add", `${path}.add`).middleware("auth");
    Route.get("/get/:id", `${path}.getById`).where("id", /^[0-9]+$/);
    Route.put("/edit/:id", `${path}.edit`)
      .where("id", /^[0-9]+$/)
      .middleware("auth");
    Route.delete("/delete/:id", `${path}.delete`)
      .where("id", /^[0-9]+$/)
      .middleware("auth");
  }).prefix("/comment");
}
