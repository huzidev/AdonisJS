import Route from '@ioc:Adonis/Core/Route';

export default function CommentRoutes() {
    const path = "CommentsController";
    Route.group(() => {
        Route.post("/add", `${path}.addComment`).middleware("auth");
    }).prefix('/comment')
}       