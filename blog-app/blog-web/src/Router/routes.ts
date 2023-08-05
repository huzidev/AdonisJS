import React from 'react';
import { roles } from 'store/auth/types';
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
const ManageUsersPage = React.lazy(() => import("pages/user/ManageUsers"));
const ManageBlogsPage = React.lazy(() => import("pages/articles/ManageBlogs"));
const SendResetPasswordPage = React.lazy(() => import("pages/auth/SendResetPassword"));
const ResetPasswordPage = React.lazy(() => import("pages/auth/ResetPassword"));
const BannedUserPage = React.lazy(() => import("pages/user/BannedUser"));
const EditCommentPage = React.lazy(() => import("pages/articles/comments/EditComment"));

// exact is used for those URL where their won't be an additional (CHANGEABLE) params/id 
// - ARTICLE_CREATE: '/blog/add here we can use exact: true because their is no additional (CHANGEABLE) params/id 
// - path: `${ROUTE_PATHS.EDIT_USER}me`, here exact is true because the params is not (CHANGEABLE) its static property me
// - path: `${ROUTE_PATHS.EDIT_USER}:id`, here we can't use exact true because here their is additional (CHANGEABLE) params/id and params.id can be 1, 2, 3
interface AppRoute {
  exact?: boolean;
  path: string;
  role?: UserRole;
  Component: React.LazyExoticComponent<() => JSX.Element>;
}   

// MANDATORY to put paths with :params at the end so their won't be any conflicts while accessing paths otherwise if some paths have URL in common like 
// /blog/add OR /blog/:slug so their can be conflicts if they are not in order

const routes: AppRoute[] = [
    {
        exact: true,
        path: ROUTE_PATHS.HOME,
        Component: HomePage
    },
    {
        // exact true because no additional (CHANGEABLE) params/id and role[1] so blogger and admin can add blogs
        exact: true,
        role: roles[1],
        path: ROUTE_PATHS.ARTICLE_CREATE,
        Component: AddBlogPage
    },
    {
        exact: true, // didn't used role because everyone even if user is not loggedIn then user can access signIn page
        path: ROUTE_PATHS.AUTH_SIGNIN,
        Component: UserFormPage
    },
    {
        exact: true,
        path: ROUTE_PATHS.AUTH_SIGNUP,
        Component: UserFormPage
    },
    {
        exact: true, // even if user is not signedIn then user can still see all the blogs
        path: ROUTE_PATHS.ARTICLES,
        Component: ViewBlogsPage
    },
    {
        exact: true,
        role: roles[2], // only admins can create users
        path: ROUTE_PATHS.USER_CREATE,
        Component: UserForm
    },
    {
        exact: true,
        // usign role because user get loggedIn first then verify
        role: roles[0],
        path: ROUTE_PATHS.VERIFY_USER,
        Component: VerifyUserPage
    },
    {
        exact: true,
        // no need for using role because while sending reset passsword user is not initially loggedIn
        path: ROUTE_PATHS.SEND_RESET_PASSWORD,
        Component: SendResetPasswordPage
    },
    {
        exact: true,
        path: ROUTE_PATHS.RESET_PASSWORD,
        Component: ResetPasswordPage
    },
    {
        exact: true,
        // user can only see if user is Banned or Not if user is loggedIn therefore using roles
        role: roles[0],
        path: ROUTE_PATHS.BANNED_USER,
        Component: BannedUserPage
    },
    {
        role: roles[1],
        path: `${ROUTE_PATHS.ARTICLE_UPDATE}:slug`,
        Component: UpdateBlogPage
    },
    {
        path: `${ROUTE_PATHS.ARTICLE_VIEW}:slug`,
        Component: ViewBlogPage
    },
    {
        // loggedIn is not necessary for view profile
        path: `${ROUTE_PATHS.VIEW_PROFILE}:id`,
        Component: ViewProfilePage
    },
    {
        exact: true,
        role: roles[0],
        path: `${ROUTE_PATHS.EDIT_USER}me`,
        Component: UserForm
    },
    {
        role: roles[2], // only admins can edit users by id
        path: `${ROUTE_PATHS.EDIT_USER}:id`,
        Component: UserForm
    },
    {
        role: roles[2], // only admins see users page
        path: `${ROUTE_PATHS.USERS_PAGE}:page`,
        Component: ManageUsersPage
    },
    {
        role: roles[1],
        path: `${ROUTE_PATHS.ARTICLES_PAGE}:page`,
        Component: ManageBlogsPage
    }
]

export default routes;