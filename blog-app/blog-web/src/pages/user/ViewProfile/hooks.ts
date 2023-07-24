import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlogs } from "store/articles";
import { useUser } from "store/user";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";

export function useViewProfilePageHook(): void {
  const user = useUser();
  const blogs = useBlogs();
  const username = user.state.getUser.data?.username;
  const params = useParams();
  const userState = user.state;
  const blogState = blogs.state;
  const prevUser = usePrevious(userState);
  const prevBlog = usePrevious(blogState);
  const navigate = useNavigate();


  // created a spearte useEffect because while calling it in the one defined below causes problem when user delete the blog then (Your details fetched successfully) notification fetching two times therefore created a seprate useEffect
  useEffect(() => {
    if (params.id === "me") {
      successNotification("Your details fetched successfully");
    }
  }, [params.id]);

  useEffect(() => {
    if (prevUser?.getUser.loading) {
      if (!userState.getUser.loading && !userState.getUser.error) {
        // if user is banned then we won't show details fetched successfully notification
        if (username && !userState.getUser.data?.isBanned) {
          successNotification(`${username}'s details fetched successfully`);
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
        const currentPage = blogState.getBlogsById.meta.currentPage;
        const lastPage = blogState.getBlogsById.meta.lastPage;
        if (username) {
          successNotification(`${username}'s blogs page ${currentPage} of ${lastPage} fetched successfully`);
        } else {
          successNotification(`Yours blogs page ${currentPage} of ${lastPage} fetched successfully`);
        }
      }
    }
  }, [userState, blogState]);
}
