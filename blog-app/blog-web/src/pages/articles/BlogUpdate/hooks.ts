import ROUTE_PATHS from "Router/paths";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { useUser } from "store/user";
import { hasPermission } from "utils";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";

export function useEditBlogPageHooks(): void {
  const blog = useBlogs();
  const auth = useAuth();
  const user = useUser();
  const params = useParams();
  const state = blog.state;
  const prev = usePrevious(state);
  const slug: any = params.slug;
  const userRole = auth.state.user?.role;
  const ownerId = state.getBlog.data?.ownerId;
  const navigate = useNavigate();

  useEffect(() => {
    blog.getBlog(slug);
    if (ownerId) {
      user.getById(ownerId);
    }
  }, [ownerId]);

  useEffect(() => {
    if (prev?.getBlog.loading) {
      if (!state.getBlog.loading && !state.getBlog.error) {
        // if user other than admins try to access edit blog path then redirect the user to blog/list path even for blogger until ownerId of the blog isn't mathcing the id of loggedIn user
        if (
          !hasPermission("admin" || "super-admin", userRole) &&
          ownerId !== auth.state.user?.id &&
          // !userRole when user is not loggedIn
          !userRole
        ) {
          toast.error("Insufficient Access, You can't edit someone else blog");
          navigate(ROUTE_PATHS.ARTICLES);
        }
      }
    }
  }, [state.getBlog, userRole]);

  useEffect(() => {
    if (prev?.updateBlog.loading) {
      if (!state.updateBlog.loading && !state.updateBlog.error) {
        successNotification(state.updateBlog.message);
        if (state.updateBlog.message?.includes("successfully")) {
          navigate(ROUTE_PATHS.ARTICLES);
        }
      } else if (!state.updateBlog.loading && state.updateBlog.error) {
          navigate("/");
      }
    }
    if (prev?.getBlog.loading) {
      if (!state.getBlog.loading && state.getBlog.error) {
          navigate("/");
      }
    }
  }, [state]);
}
