import Route from "@ioc:Adonis/Core/Route";

export default function ReactionsRoutes() {
  const path = "ReactionsController";
  Route.group(() => {
    Route.post("/blog", `${path}.add`).middleware("auth");
    Route.get("/get/:articleId/:id", `${path}.getReactions`)
    .where("articleId", /^[0-9]+$/)
    .where("id", /^[0-9]+$/);
    Route.get("/get/:articleId", `${path}.getReactions`)
    .where("articleId", /^[0-9]+$/)
    Route.get("/get_all", `${path}.getAllReactions`);
  }).prefix("/reaction");
}
