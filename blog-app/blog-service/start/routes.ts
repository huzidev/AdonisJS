import Route from '@ioc:Adonis/Core/Route';

import ArticlesRoutes from './routes/article';
import UsersRoutes from './routes/auth';

Route.group(() => {
  ArticlesRoutes()
  UsersRoutes()
})