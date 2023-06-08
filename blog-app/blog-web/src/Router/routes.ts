import React from 'react';
import ROUTE_PATHS from './paths';

const EditProfilePage = React.lazy(() => import('pages/user/EditProfile'));
const HomePage = React.lazy(() => import('pages/user/EditProfile'));
const AddBlogPage = React.lazy(() => import('pages/user/EditProfile'));
const UpdateBlogPage = React.lazy(() => import('pages/user/EditProfile'));
const ViewBlogPage = React.lazy(() => import('pages/user/EditProfile'));
const ViewBlogsPage = React.lazy(() => import('pages/user/EditProfile'));
const UserSignInPage = React.lazy(() => import('pages/user/EditProfile'));
const UserSignUpPage = React.lazy(() => import('pages/user/EditProfile'));
const ViewProfilePage = React.lazy(() => import('pages/user/EditProfile'));

interface AppRoute {
  path: string;
  Component: React.LazyExoticComponent<() => JSX.Element>;
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