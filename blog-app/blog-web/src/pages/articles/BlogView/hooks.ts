import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { useReactions } from "store/reactions";
import { useUser } from "store/user";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";

export function useGetBlogPageHooks() {
  const params: any = useParams();
  const blog = useBlogs();
  const reaction = useReactions();
  const user = useUser();
  const auth = useAuth();
  const state = blog.state;
  const prev = usePrevious(state);
  const navigate = useNavigate();
  const ownerId: any = state.getBlog.data?.ownerId;
  const byMe = ownerId === auth.state.user?.id;
  const loggedInId: any = auth.state.user?.id;
  const blogId: any = state.getBlog.data?.id;
  const [reactionState, setReactionState] = useState<any>({
    totalLikes: null,
    totalDislikes: null,
    userId: null
  })

  const allReaction = reaction.state.getReactions.data;

  // seprately making with different useEffect because while creating in same useEffect as of ownerId it's fetching data multiple times
  useEffect(() => {
    blog.getBlog(params.slug);
  }, []);

  useEffect(() => {
    if (ownerId) {
      user.getById(ownerId);
    }
  }, [ownerId])

  useEffect(() => {
    if (blogId) {
      reaction.getReactions({ articleId: blogId, userId: loggedInId });
    }
  }, [blogId])

  useEffect(() => {
    setReactionState({ ...allReaction })
  }, [allReaction])

  useEffect(() => {
    if (prev?.getBlog.loading) {
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
    console.log("state.getBlog.message", state.getBlog.message);
  }, [state]);

  return {
    reactionState
  }

}
