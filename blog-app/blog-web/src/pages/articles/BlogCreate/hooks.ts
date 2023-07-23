import ROUTE_PATHS from "Router/paths";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogs } from "store/articles";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";

export function useCreateBlogPageHooks(): void {
  const blog = useBlogs();
  const state = blog.state;
  const prev = usePrevious(state);
  const navigate = useNavigate();
  // const allBlogs = state.getBlogs.data;

  // this statement is mandatory to create here because if user is on Add Blog page and reloads the page then allBlogs.length became 0 
  // and we've a condition create for blogs hook that only fetch if !allBlogs.length but when user reloads the page and add new Blog then allBlogs.length became 1 and only the new blog will be visible
  // therefore we've created this condition here so even if user reloads the page on addBlogs page then fetch all the blogs
  // useEffect(() => {
  //   if (!allBlogs.length) {
  //     blog.getBlogs({page: 1});
  //   }
  // }, [])
  
  useEffect(() => {
    if (prev?.addBlog.loading) {
      if (!state.addBlog.loading && !state.addBlog.error) {
        successNotification(state.addBlog.message);
        if (state.addBlog.message?.includes("successfully")) {
          navigate(ROUTE_PATHS.ARTICLES);
        }
      }
    }
  }, [state]);
}
