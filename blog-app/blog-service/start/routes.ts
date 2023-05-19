import Route from '@ioc:Adonis/Core/Route';

import ArticlesRoutes from './routes/article';

Route.get('/', async () => {
  return "Hello, World!"
});

Route.group(() => {
  ArticlesRoutes()
})