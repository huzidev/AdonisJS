import Route from '@ioc:Adonis/Core/Route';

import ArticlesRoutes from './routes/article';
import UsersRoutes from './routes/user';

Route.get('/', async () => {
  return "Hello, World!"
});

Route.group(() => {
  ArticlesRoutes()
  UsersRoutes()
})