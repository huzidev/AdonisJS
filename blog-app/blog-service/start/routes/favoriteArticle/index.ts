import Route from "@ioc:Adonis/Core/Route";

export default function FavoriteArticlesRoutes() {
  const path = "FavoriteArticlesController";
  Route.group(() => {
    Route.post("/add_favorite_article", `${path}.add`).middleware("auth");
    Route.get("/all_favorite_articles/:page", `${path}.get`)
        .where("page", /^[0-9]+$/);
    Route.get("/get_favorite_article/:id/:page", `${path}.get`)
        .where("id", /^[0-9]+$/)
        .where("page", /^[0-9]+$/)
  }).prefix("/article");
}
