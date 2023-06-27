import ROUTE_PATHS from "Router/paths";
export const links = [
  {
    title: 'Blogs',
    link: ROUTE_PATHS.ARTICLES
  },
  {
    title: 'Login',
    link: ROUTE_PATHS.AUTH_SIGNIN
  },
  {
    title: 'Register',
    link: ROUTE_PATHS.AUTH_SIGNUP
  },
  {
    title: 'Add Blog',
    link: ROUTE_PATHS.ARTICLE_CREATE
  },
  {
    title: 'View Profile',
    link: ROUTE_PATHS.VIEW_PROFILE
  }
];

export const loggedInPaths = [
  ROUTE_PATHS.ARTICLES,
  ROUTE_PATHS.ARTICLE_CREATE,
  ROUTE_PATHS.VIEW_PROFILE
];
  
export const loggedOutPaths = [
  ROUTE_PATHS.ARTICLES,
  ROUTE_PATHS.AUTH_SIGNIN,
  ROUTE_PATHS.AUTH_SIGNUP
];
