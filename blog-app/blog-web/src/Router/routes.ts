import ROUTE_PATHS from './paths';

import HomePage from '../components/pages/Home';
import AddBlogPage from '../components/pages/articles/BlogForm';
import UpdateBlogPage from '../components/pages/articles/BlogUpdate';
import ViewBlogPage from '../components/pages/articles/BlogView';
import ViewBlogsPage from '../components/pages/articles/Blogs';
import UserSignInPage from '../components/pages/auth/login';
import UserSignUpPage from '../components/pages/auth/register';

interface AppRoute {
  exact?: boolean;
  path: string;
  Component: () => JSX.Element;
}

export const routes: AppRoute[] = [
    {
        exact: true,
        path: ROUTE_PATHS.HOME,
        Component: HomePage
    },
    {
        path: ROUTE_PATHS.ARTICLES,
        Component: ViewBlogsPage
    },
    {
        path: `${ROUTE_PATHS.ARTICLE_VIEW}:slug`,
        Component: ViewBlogPage
    },
    {
        exact: true,
        path: ROUTE_PATHS.ARTICLE_CREATE,
        Component: AddBlogPage
    },
    {
        path: `${ROUTE_PATHS.ARTICLE_UPDATE}:slug`,
        Component: UpdateBlogPage
    },
    {
        exact: true,
        path: ROUTE_PATHS.USER_SIGNIN,
        Component: UserSignInPage
    },
    {
        exact: true,
        path: ROUTE_PATHS.USER_SIGNUP,
        Component: UserSignUpPage
    },
]