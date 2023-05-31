import ROUTE_PATHS from './paths';

import HomePage from '../pages/Home';
import AddBlogPage from '../pages/articles/BlogForm';
import UpdateBlogPage from '../pages/articles/BlogUpdate';
import ViewBlogPage from '../pages/articles/BlogView';
import ViewBlogsPage from '../pages/articles/Blogs';
import UserSignInPage from '../pages/auth/login';
import UserSignUpPage from '../pages/auth/register';

interface AppRoute {
  path: string;
  Component: () => JSX.Element;
}

const routes: AppRoute[] = [
    {
        path: `${ROUTE_PATHS.ARTICLE_VIEW}:slug`,
        Component: ViewBlogPage
    },
    {
        path: ROUTE_PATHS.ARTICLE_CREATE,
        Component: AddBlogPage
    },
    {
        path: `${ROUTE_PATHS.ARTICLE_UPDATE}:slug`,
        Component: UpdateBlogPage
    },
    {
        path: ROUTE_PATHS.USER_SIGNIN,
        Component: UserSignInPage
    },
    {
        path: ROUTE_PATHS.USER_SIGNUP,
        Component: UserSignUpPage
    },
    {
        path: ROUTE_PATHS.ARTICLES,
        Component: ViewBlogsPage
    },
    {
        path: ROUTE_PATHS.HOME,
        Component: HomePage
    },
]

export default routes;