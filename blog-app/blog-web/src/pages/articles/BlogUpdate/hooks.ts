import ROUTE_PATHS from "Router/paths";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { hasPermission } from "utils";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";

export function useEditBlogPageHooks(): void {
  const blog = useBlogs();
  const auth = useAuth();
  const params = useParams();
  const state = blog.state;
  const prev = usePrevious(state);
  const slug: any = params.slug;
  const userRole = auth.state.user?.role;
  const navigate = useNavigate();

  useEffect(() => {
    blog.getBlog(slug);
  }, []);

  console.log("Blog owner id", state.getBlog.data?.ownerId);
// state.getBlog.data?.ownerId !== auth.state.user?.id || 
  useEffect(() => {
    if (prev?.getBlog.loading) {
      if (!hasPermission("admin" || "super-admin", userRole) && (state.getBlog.data?.ownerId !== auth.state.user?.id)) {
        toast.error("Insufficient Access, You can't edit someone else blog");
        navigate(ROUTE_PATHS.ARTICLES);
      }
    }
  }, [state.getBlog]);

  useEffect(() => {
    if (prev?.updateBlog.loading) {
      if (!state.updateBlog.loading && !state.updateBlog.error) {
        successNotification(state.updateBlog.message);
        if (state.updateBlog.message?.includes("successfully")) {
          navigate(ROUTE_PATHS.ARTICLES);
        }
      }
    }
  }, [state]);
}
