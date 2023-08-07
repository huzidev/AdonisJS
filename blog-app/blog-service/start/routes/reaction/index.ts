import Route from "@ioc:Adonis/Core/Route";

export default function ReactionsRoutes() {
  const path = "ReactionsController";
  Route.group(() => {
    Route.post("/blog", `${path}.add`).middleware("auth");
  }).prefix("/reaction");
}
