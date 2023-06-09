import React from 'react';
import ROUTE_PATHS from './paths';

const HomePage = React.lazy(() => import('pages/Home'));
const UserForm = React.lazy(() => import('pages/user/UserForm'));
const AddBlogPage = React.lazy(() => import('pages/articles/BlogCreate'));
const UpdateBlogPage = React.lazy(() => import('pages/articles/BlogUpdate'));
const ViewBlogPage = React.lazy(() => import('pages/articles/BlogView'));
const ViewBlogsPage = React.lazy(() => import('pages/articles/Blogs'));
const ViewProfilePage = React.lazy(() => import('pages/user/ViewProfile'));
const UserFormPage = React.lazy(() => import('pages/auth/Form'));
const VerifyUserPage = React.lazy(() => import('pages/user/VerifyUser'));
const UsersPage = React.lazy(() => import("pages/user/ManageUsers"));
const SendResetPasswordPage = React.lazy(() => import("pages/auth/SendResetPassword"));
const ResetPasswordPage = React.lazy(() => import("pages/auth/ResetPassword"));
const BannedUserPage = React.lazy(() => import("pages/user/BannedUser"));
const NotFoundPage = React.lazy(() => import("pages/NotFound"))

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
        Component: UserFormPage
    },
    {
        path: ROUTE_PATHS.AUTH_SIGNUP,
        Component: UserFormPage
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
        path: `${ROUTE_PATHS.VIEW_PROFILE}:id`,
        Component: ViewProfilePage
    },
    {
        path: `${ROUTE_PATHS.EDIT_USER}:id`,
        Component: UserForm
    },
    {
        path: ROUTE_PATHS.USER_CREATE,
        Component: UserForm
    },
    {
        path: ROUTE_PATHS.VERIFY_USER,
        Component: VerifyUserPage
    },
    {
        path: `${ROUTE_PATHS.USERS_PAGE}:page`,
        Component: UsersPage
    },
    {
        path: ROUTE_PATHS.SEND_RESET_PASSWORD,
        Component: SendResetPasswordPage
    },
    {
        path: ROUTE_PATHS.RESET_PASSWORD,
        Component: ResetPasswordPage
    },
    {
        path: ROUTE_PATHS.BANNED_USER,
        Component: BannedUserPage
    },
    {
        path: ROUTE_PATHS.NOT_FOUND,
        Component: NotFoundPage
    }
]

export default routes;