import Route from "@ioc:Adonis/Core/Route";

export default function ReactionsRoutes() {
  const path = "ReactionsController";
  Route.group(() => {
    Route.post("/blog", `${path}.add`).middleware("auth");
    Route.get("/get/:articleId/:id", `${path}.getReactions`)
      .where("articleId", /^[0-9]+$/)
      .where("id", /^[0-9]+$/);
  }).prefix("/reaction");
}
