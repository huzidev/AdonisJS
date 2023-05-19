import Route from '@ioc:Adonis/Core/Route';
import Database from '@ioc:Adonis/Lucid/Database';

Route.get('*', async () => {
  return "Hello, World!"
});


Route.get("/articles", async () => {
  const response = await Database.from("articles").select("*");
  return response;
});
