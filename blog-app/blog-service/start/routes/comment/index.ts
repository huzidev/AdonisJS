import Route from '@ioc:Adonis/Core/Route';

export default function CommentRoutes() {
    const path = "CommentsController";
    Route.group(() => {
        Route.post("/add", `${path}.addComment`).middleware("auth");
        Route.get("/get/:id", `${path}.getComments`).where("id", /^[0-9]+$/);
        Route.put("/edit/:id", `${path}.getComments`)
            .where("id", /^[0-9]+$/)
            .middleware("auth");
    }).prefix('/comment')
}       