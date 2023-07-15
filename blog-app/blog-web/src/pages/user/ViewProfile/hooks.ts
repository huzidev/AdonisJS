import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBlogs } from "store/articles";
import { useUser } from "store/user";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";

export function useViewProfilePageHook(): void {
  const user = useUser();
  const blogs = useBlogs();
  const username = user.state.getUser.data?.username;
  const params = useParams();
  const userState = user.state.getUser;
  const blogState = blogs.state.deleteBlog;
  const prevUser = usePrevious(userState);
  const prevBlog = usePrevious(blogState);

  useEffect(() => {
    if (params.id === "me") {
      successNotification("Your details fetched successfully!");
    }
  }, [params.id]);

  useEffect(() => {
    if (prevUser?.loading) {
      if (!userState.loading && !userState.error) {
        if (username) {
          successNotification(`${username}'s details fetched successfully`);
        }
      }
    }
    if (prevBlog?.loading) {
      if (!blogState.loading && !blogState.error) {
        successNotification(blogState.message);
      }
    }
  }, [userState, blogState]);
}
