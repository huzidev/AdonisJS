import Route from '@ioc:Adonis/Core/Route';

import ArticlesRoutes from './routes/article';
import AuthRoutes from './routes/auth';
import UsersRoutes from './routes/user';

Route.group(() => {
  ArticlesRoutes()
  AuthRoutes()
  UsersRoutes()
})