import Route from '@ioc:Adonis/Core/Route';

export default function ArticlesRoutes() {
    const path = "ArticlesController";
    Route.group(() => {
        Route.get("/list/:page", `${path}.getBlogs`) // .getBlogs is function created in app/controllers/ArticlesController.ts
            .where("page", /^[0-9]+$/);
        Route.get("/list/:id/:page", `${path}.getBlogs`)
            .where("id", /^[a-z0-9]+$/)    
            .where("page", /^[0-9]+$/)
        Route.post("/create", `${path}.addBlog`).middleware("auth");
        Route.get("/:slug", `${path}.getById`)
            .where("slug", /^[a-z0-9_-]+$/);
        Route.put("/edit/:id", `${path}.updateBlog`).middleware("auth")
            .where("id", /^[0-9]+$/);
        Route.delete("/delete/:id", `${path}.deleteBlog`).middleware("auth")
            .where("id", /^[0-9]+$/);
    }).prefix("/article")
}