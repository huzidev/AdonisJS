import { useEffect } from "react";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { useUser } from "store/user";

export function useBlogsPageHooks(): void {
  const blogs = useBlogs();
  const user = useUser();
  const auth = useAuth();
  const allUsers: any = user.state.allUser?.data;
  const allBlogs = blogs.state.getBlogs?.data;
  const favoriteBlogs = blogs.state.getFavoriteBlogs;
  const payload: any = {
    userId: auth.state.user?.id,
    page: 1
  }
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
    if (!favoriteBlogs.data.length) {
      blogs.getFavoriteBlogs(payload);
    }
  }, []);
}
