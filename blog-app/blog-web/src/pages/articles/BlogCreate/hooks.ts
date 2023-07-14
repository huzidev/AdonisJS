import ROUTE_PATHS from "Router/paths";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlogs } from "store/articles";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";

export function useCreateBlogPageHooks(): void {
  const blog = useBlogs();
  const params = useParams();
  const state = blog.state.addBlog;
  const prev = usePrevious(state);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (prev?.loading) {
      if (!state.loading && !state.error) {
        successNotification(state.message);
        if (state.message?.includes("successfully")) {
          navigate(ROUTE_PATHS.ARTICLES);
        }
      }
    }
  }, [state]);
}
