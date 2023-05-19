import Route from '@ioc:Adonis/Core/Route';

Route.get('/', async () => {
  return "Hello, World!"
});


Route.get("/articles", async () => {
  const path = "ArticlesController";
  
});
