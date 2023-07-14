import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBlogs } from "store/articles";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";

export function useEditBlogPageHooks(): void {
  const blog = useBlogs();
  const params = useParams();
  const state = blog.state.updateBlog;
  const prev = usePrevious(state);
  const slug: any = params.slug;
  useEffect(() => {
    blog.getBlog(slug);
  }, []);

  useEffect(() => {
    if (prev?.loading) {
      if (!state.loading && !state.error) {
        successNotification(state.message);
      }
    }
  }, [state]);
}
