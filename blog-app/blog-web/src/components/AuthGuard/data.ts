import ROUTE_PATHS from "Router/paths";

export const notAllowedPaths = [
  ROUTE_PATHS.ARTICLE_CREATE,
  ROUTE_PATHS.ARTICLE_UPDATE,
  // check whether to add "me" or not
  ROUTE_PATHS.EDIT_USER,
  ROUTE_PATHS.VIEW_PROFILE + "me",
  ROUTE_PATHS.VERIFY_USER
];
  