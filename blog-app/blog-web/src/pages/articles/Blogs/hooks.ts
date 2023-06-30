import { useEffect } from "react";
import { useBlogs } from "store/articles";
import { useUser } from "store/user";

export function useBlogsPageHooks(): void {
  const blogs = useBlogs();
  const user = useUser();
  const allUsers: any = user.state.allUser?.data;
  const allBlogs = blogs.state.getBlogs?.data;

    useEffect(() => {
    // if their is already blogs fetched means they were saved in our redux state hence no need to fetched the blogs again
    if (!allBlogs.length) {
      blogs.getBlogs(1);
    }
    if (!allUsers) {
      user.allUser();
    }
  }, []);

}
