import ROUTE_PATHS from "Router/paths";
export const links = [
  {
    title: 'Blogs',
    link: ROUTE_PATHS.ARTICLES
  },
  {
    title: 'SignIn',
    link: ROUTE_PATHS.AUTH_SIGNIN
  },
  {
    title: 'SignUp',
    link: ROUTE_PATHS.AUTH_SIGNUP
  },
  {
    title: 'Add Blog',
    link: ROUTE_PATHS.ARTICLE_CREATE
  },
  {
    title: 'Manage Blogs',
    link: ROUTE_PATHS.ARTICLES_PAGE
  },
  {
    title: 'Manage Users',
    link: ROUTE_PATHS.USERS_PAGE
  },
  {
    title: 'View Profile',
    link: ROUTE_PATHS.VIEW_PROFILE + "me"
  }
];

export const managePaths = [ROUTE_PATHS.ARTICLES_PAGE, ROUTE_PATHS.USERS_PAGE];

export const loggedInPathsBlogger = [
  ROUTE_PATHS.ARTICLES,
  ROUTE_PATHS.ARTICLE_CREATE,
  ROUTE_PATHS.ARTICLES_PAGE,
  ROUTE_PATHS.VIEW_PROFILE + "me"
];

export const loggedInPathsUser = [
  ROUTE_PATHS.ARTICLES,
  ROUTE_PATHS.VIEW_PROFILE + "me"
];
  
export const loggedOutPaths = [
  ROUTE_PATHS.ARTICLES,
  ROUTE_PATHS.AUTH_SIGNIN,
  ROUTE_PATHS.AUTH_SIGNUP
];

export const adminPaths = [
  ROUTE_PATHS.ARTICLES,
  ROUTE_PATHS.ARTICLE_CREATE,
  ROUTE_PATHS.ARTICLES_PAGE,
  ROUTE_PATHS.USERS_PAGE,
  ROUTE_PATHS.VIEW_PROFILE + "me"
];