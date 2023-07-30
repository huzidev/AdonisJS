import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { useUser } from "store/user";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";

export function useViewProfilePageHook(): void {
  const user = useUser();
  const auth = useAuth();
  const blogs = useBlogs();
  const username = user.state.getUser.data?.username;
  const loggedInUser = auth.state.user?.username;
  const params = useParams();
  const userState = user.state;
  const blogState = blogs.state;
  const prevUser = usePrevious(userState);
  const prevBlog = usePrevious(blogState);
  const navigate = useNavigate();

  useEffect(() => {
    if (prevUser?.getUser.loading) {
      if (!userState.getUser.loading && !userState.getUser.error) {
        // if user is banned then we won't show details fetched successfully notification
        if (username && !userState.getUser.data?.isBanned) {
          // check if clicked user's name (username) matches the loggedInUser name then call yours details fetched successfully
          successNotification(`${username === loggedInUser ? "Yours" : username}'s details fetched successfully`);
        }
      } // when user tries to change the URL example if user changes view/:id id of the user which doesn't exist then show error 
      else if (!userState.getUser.loading && userState.getUser.error) {
        navigate("/");
      }
    }
    if (prevBlog?.deleteBlog.loading) {
      if (!blogState.deleteBlog.loading && !blogState.deleteBlog.error) {
        successNotification(blogState.deleteBlog.message);
      }
    }
    if (prevBlog?.getBlogsById.loading) {
      if (!blogState.getBlogsById.loading && !blogState.getBlogsById.error) {
        // created these two const variable here because in this statement these variable will be updated
        const currentPage = blogState.getBlogsById.meta.currentPage;
        const lastPage = blogState.getBlogsById.meta.lastPage;
        if (username) {
          successNotification(`${username === loggedInUser ? "Yours" : username}'s blogs page ${currentPage} of ${lastPage} fetched successfully`);
        }
      }
    }
  }, [userState, blogState]);
}
