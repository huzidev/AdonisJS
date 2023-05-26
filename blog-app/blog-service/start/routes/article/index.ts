import Route from '@ioc:Adonis/Core/Route';

export default function ArticlesRoutes() {
    const path = "ArticlesController";
    Route.get("/articles", `${path}.getBlogs`); // .getBlogs is function created in app/controllers/ArticlesController.ts
    Route.post("/add_article", `${path}.addBlog`);
    Route.get("/article/:id", `${path}.getById`)
        .where("id", /^[0-9]+$/);
    Route.put("/article/edit/:slug", `${path}.updateBlog`)
        .where('slug', /^[a-z0-9_-]+$/);
    Route.delete("/article/delete/:id", `${path}.deleteBlog`)
        .where("id", /^[0-9]+$/);
}