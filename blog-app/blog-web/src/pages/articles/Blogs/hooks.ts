import { useEffect } from "react";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { useUser } from "store/user";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";

export function useBlogsPageHooks(): void {
  const blogs = useBlogs();
  const user = useUser();
  const auth = useAuth();
  const state = blogs.state;
  const prev = usePrevious(state);
  const allUsers: any = user.state.allUser?.data;
  const allBlogs = blogs.state.getBlogs?.data;
  const favoriteBlogs = blogs.state.getFavoriteBlogs;
  const payload: any = {
    userId: auth.state.user?.id,
    page: 1
  };

  useEffect(() => {
    // if their is already blogs fetched means they were saved in our redux state hence no need to fetched the blogs again
    if (!allUsers) {
      user.allUser();
    }

    if (!allBlogs.length) {
      blogs.getBlogs(1);
    }

    // so only if loggedIn user's role is user then fetch favorite blogs
    if (auth.state.user?.role === "user" && !favoriteBlogs.data.length) {
      blogs.getFavoriteBlogs(payload);
    }
  }, [favoriteBlogs.data.length]);

  useEffect(() => {
    if (prev?.getBlogs.loading) {
      if (!state.getBlogs.loading && !state.getBlogs.error) {
        successNotification(state.getBlogs.message);
      }
    }
    if (prev?.deleteBlog.loading) {
      if (!state.deleteBlog.loading && !state.deleteBlog.error) {
        successNotification(state.deleteBlog.message);
      }
    }
  }, [state]);
}
