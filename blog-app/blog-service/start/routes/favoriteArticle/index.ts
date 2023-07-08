import Route from "@ioc:Adonis/Core/Route";

export default function FavoriteArticlesRoutes() {
  const path = "FavoriteArticlesController";
  Route.group(() => {
    Route.post("/add_favorite_article", `${path}.add`).middleware("auth");
  }).prefix("/article");
}
