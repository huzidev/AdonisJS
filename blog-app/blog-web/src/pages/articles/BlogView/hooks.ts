import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { useReactions } from "store/reactions";
import { useUser } from "store/user";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";

export function useGetBlogPageHooks(): void {
  const params: any = useParams();
  const blog = useBlogs();
  const reaction = useReactions();
  const user = useUser();
  const auth = useAuth();
  const state = blog.state;
  const prev = usePrevious(state);
  const navigate = useNavigate();
  const prevReact = usePrevious(reaction.state.addReaction);
  const ownerId: any = state.getBlog.data?.ownerId;
  const prevFavorite = usePrevious(
    blog.state.getFavoriteBlog.data?.id
      ? blog.state.removeFavoriteBlog
      : blog.state.addFavoriteBlog
  );
  const byMe = ownerId === auth.state.user?.id;
  const loggedInId: any = auth.state.user?.id;
  const blogId: any = state.getBlog.data?.id;

  // seprately making with different useEffect because while creating in same useEffect as of ownerId it's fetching data multiple times
  useEffect(() => {
    blog.getBlog(params.slug);
  }, []);

  useEffect(() => {
    // when user clikced on like or dislike button then fetch the updated data
    if (prevReact?.loading) {
      reaction.getReactions({ articleId: blogId, userId: loggedInId });
    }
    if (prevFavorite?.loading) {
      blog.getFavoriteBlog({
        userId: loggedInId,
        articleId: blogId,
      });
    }
  }, [
    reaction.state.addReaction,
    state.addFavoriteBlog,
    state.removeFavoriteBlog,
  ]);

  useEffect(() => {
    if (prev?.getBlog.loading) {
      // Fetch user data by id when blog is load successfully
      // no need to fetch user by id if user is on own blog because then auth.state will stored the loggedIn user's details
      if (!byMe) {
        user.getById(ownerId);
      }
      // when user is loggedIn then getReactions with loggedIn user id to show like/liked button to check whether user has already liked the blog or not
      if (blogId && auth.state.user) {
        // only fetch favortieBlog when loggedIn user's role is user
        if (auth.state.user.role === "user") {
          blog.getFavoriteBlog({
            userId: loggedInId,
            articleId: blogId,
          });
        }
        reaction.getReactions({ articleId: blogId, userId: loggedInId });
      }
      // if user is not loggedIn
      else if (blogId && !auth.state.user) {
        reaction.getReactions({ articleId: blogId });
      }
      if (!state.getBlog.loading && !state.getBlog.error) {
        if (byMe) {
          successNotification("Blog by you fetched successfully");
        } else {
          successNotification(state.getBlog.message);
        }
      } // if user tries to change to URL id which doesn't exist in database
      else if (!state.getBlog.loading && state.getBlog.error) {
        navigate("/");
      }
    }
  }, [state.getBlog]);
}
