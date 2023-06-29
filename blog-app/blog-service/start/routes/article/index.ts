import Route from '@ioc:Adonis/Core/Route';

export default function ArticlesRoutes() {
    const path = "ArticlesController";
    Route.get("/articles/:page", `${path}.getBlogs`) // .getBlogs is function created in app/controllers/ArticlesController.ts
        .where("page", /^[0-9]+$/);
    Route.post("/add_article", `${path}.addBlog`).middleware("auth");
    Route.get("/article/:slug", `${path}.getById`)
        .where("slug", /^[a-z0-9_-]+$/);
    Route.put("/article/edit/:id", `${path}.updateBlog`).middleware("auth")
        .where("id", /^[0-9]+$/);
    Route.delete("/article/delete/:id", `${path}.deleteBlog`).middleware("auth")
        .where("id", /^[0-9]+$/);
}