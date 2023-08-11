import Route from '@ioc:Adonis/Core/Route';

import ArticlesRoutes from './routes/article';
import AuthRoutes from './routes/auth';
import CommentRoutes from './routes/comment';
import FavoriteArticlesRoutes from './routes/favoriteArticle';
import ReactionsRoutes from './routes/reaction';
import ReplyRoutes from './routes/reply';
import UsersRoutes from './routes/user';

Route.group(() => {
  ArticlesRoutes()
  AuthRoutes()
  UsersRoutes()
  FavoriteArticlesRoutes()
  CommentRoutes()
  ReactionsRoutes()
  ReplyRoutes()
})