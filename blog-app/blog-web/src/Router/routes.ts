import ROUTE_PATHS from './paths';

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
    }
]