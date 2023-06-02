import ROUTE_PATHS from './paths';

import EditProfilePage from 'pages/user/EditProfile';
import HomePage from '../pages/Home';
import AddBlogPage from '../pages/articles/BlogCreate';
import UpdateBlogPage from '../pages/articles/BlogUpdate';
import ViewBlogPage from '../pages/articles/BlogView';
import ViewBlogsPage from '../pages/articles/Blogs';
import UserSignInPage from '../pages/auth/Login';
import UserSignUpPage from '../pages/auth/Register';
import ViewProfilePage from "../pages/user/ViewProfile";

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
        path: ROUTE_PATHS.AUTH_SIGNIN,
        Component: UserSignInPage
    },
    {
        path: ROUTE_PATHS.AUTH_SIGNUP,
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
    {
        path: ROUTE_PATHS.VIEW_PROFILE,
        Component: ViewProfilePage
    },
    {
        path: ROUTE_PATHS.EDIT_PROFILE,
        Component: EditProfilePage
    }
]

export default routes;