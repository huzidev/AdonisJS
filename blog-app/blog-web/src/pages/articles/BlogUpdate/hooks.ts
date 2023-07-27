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
  const stateUser = user.state;
  const prev = usePrevious(state);
  const prevUser = usePrevious(stateUser);
  const slug: any = params.slug;
  const userRole = user.state.getUser.data?.role;
  const authRole = auth.state.user?.role;
  const ownerId: any = blog.state.getBlog.data?.ownerId;
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      blog.getBlog(slug);
      // so only get userData by id when blog get fetched successfully otherwise the id of previous user remains saved and will give error
      if (prev?.getBlog.loading) {
        user.getById(ownerId)
      }
    }
  }, [ownerId])

  useEffect(() => {
    if (prev?.updateBlog.loading) {
      if (!state.updateBlog.loading && !state.updateBlog.error) {
        successNotification(state.updateBlog.message);
        if (state.updateBlog.message?.includes("successfully")) {
          navigate(ROUTE_PATHS.ARTICLES);
        }
      }
    }
    if (prev?.getBlog.loading) {
      if (!state.getBlog.loading && state.getBlog.error) {
        navigate("/");
      }
    }
    // if user other than admins try to access edit blog path then redirect the user to blog/list path even for blogger until ownerId of the blog isn't mathcing the id of loggedIn user
    if (prevUser?.getUser.loading) {
      if (
        !hasPermission("admin", authRole) &&
        ownerId !== auth.state.user?.id
        // !userRole when user is not loggedIn
      ) {
        toast.error("Insufficient Access, You can't edit someone else blog");
        navigate(ROUTE_PATHS.ARTICLES);
      }
      if (authRole === "admin" && userRole === "super-admin") {
        toast.error("Insufficient Access, You can't edit super-admin's blog");
        navigate(ROUTE_PATHS.ARTICLES);
      }
    } 
  }, [state, stateUser]);
}