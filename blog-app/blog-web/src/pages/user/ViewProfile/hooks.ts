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
  const blogState = blogs.state;
  const prevUser = usePrevious(userState);
  const prevBlog = usePrevious(blogState);

  // created a spearte useEffect because while calling it in the one defined below causes problem when user delete the blog then (Your details fetched successfully) notification fetching two times therefore created a seprate useEffect
  useEffect(() => {
    if (params.id === "me") {
      successNotification("Your details fetched successfully");
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
    if (prevBlog?.deleteBlog.loading) {
      if (!blogState.deleteBlog.loading && !blogState.deleteBlog.error) {
        successNotification(blogState.deleteBlog.message);
      }
    }
    if (prevBlog?.getBlogsById.loading) {
      if (!blogState.getBlogsById.loading && !blogState.getBlogsById.error) {
        if (username) {
          successNotification(`${username}'s blogs fetched successfully`);
        } else {
          successNotification("Yours blogs fetched successfully");
        }
      }
    }
  }, [userState, blogState]);
}
