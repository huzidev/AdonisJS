import Route from '@ioc:Adonis/Core/Route';

export default function ArticlesRoutes() {
    const path = "ArticlesController";
    Route.group(() => {
        // when user is at main blogs page
        Route.get("/list/:page", `${path}.getBlogs`) // .getBlogs is function created in app/controllers/ArticlesController.ts
            .where("page", /^[0-9]+$/);
        Route.get("/list/:id/:page", `${path}.getBlogs`)
            .where("id", /^[0-9]+$/)    
            .where("page", /^[0-9]+$/)
        Route.post("/create", `${path}.addBlog`).middleware("auth:blogger");
        Route.get("/:slug", `${path}.getById`)
            .where("slug", /^[a-z0-9_-]+$/)
            .middleware("auth");
        Route.put("/edit/:id", `${path}.updateBlog`).middleware("auth:blogger")
            .where("id", /^[0-9]+$/);
        Route.delete("/delete/:id", `${path}.deleteBlog`).middleware("auth:blogger")
            .where("id", /^[0-9]+$/);
    }).prefix("/article")
}