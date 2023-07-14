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
  const state = blogs.state.getBlogs;
  const prev = usePrevious(state);
  const allUsers: any = user.state.allUser?.data;
  const allBlogs = blogs.state.getBlogs?.data;
  const favoriteBlogs = blogs.state.getFavoriteBlogs;
  const payload: any = {
    userId: auth.state.user?.id,
    page: 1
  }

  console.log("state", state);

    useEffect(() => {
    // if their is already blogs fetched means they were saved in our redux state hence no need to fetched the blogs again
    if (!allBlogs.length) {
      blogs.getBlogs(1);
    }
    if (!allUsers) {
      user.allUser();
    }
  }, []);
  
  useEffect(() => {
    console.log("favortie Blogs", favoriteBlogs.data.length);
    // so only is user with the role of user loggedIn then fetch favorite blogs
    if (auth.state.user?.role === "user" && !favoriteBlogs.data.length) {
      blogs.getFavoriteBlogs(payload);
    }
  }, []);
  
  useEffect(() => {
    if (prev?.loading) {
      if (!state.loading && !state.error) {
        successNotification(state.message);
      }
    }
  }, [state]);
}
