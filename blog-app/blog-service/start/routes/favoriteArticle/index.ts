import Route from "@ioc:Adonis/Core/Route";

export default function FavoriteArticlesRoutes() {
  const path = "FavoriteArticlesController";
  Route.group(() => {
    Route.post("/add_favorite_article", `${path}.add`).middleware("auth");
    Route.delete("/remove_favorite_article/:id", `${path}.remove`)
      .where("id", /^[0-9]+$/)
      .middleware("auth");
    Route.get("/get_favorite_article/:id/:page", `${path}.get`)
        .where("id", /^[0-9]+$/)
        .where("page", /^[0-9]+$/)
  }).prefix("/article");
}
