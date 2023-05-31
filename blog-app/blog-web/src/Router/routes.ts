import ROUTE_PATHS from './paths';

import AddBlogPage from '../components/pages/articles/BlogForm';
import UpdateBlogPage from '../components/pages/articles/BlogUpdate';
import ViewBlogPage from '../components/pages/articles/BlogView';
import ViewBlogsPage from '../components/pages/articles/Blogs';

interface AppRoute {
  exact?: boolean;
  path: string;
  Component: () => JSX.Element;
}

export const routes: AppRoute[] = [
    {
        exact: true,
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
        exact: true,
        path: ROUTE_PATHS.ARTICLE_UPDATE,
        Component: UpdateBlogPage
    },
]