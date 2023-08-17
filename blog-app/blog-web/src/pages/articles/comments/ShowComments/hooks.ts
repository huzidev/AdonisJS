import { useEffect, useState } from "react";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { useComment } from "store/comment";
import { useUser } from "store/user";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";
import { AddCommentPayload, AllCommentsState } from "./types";

export function useCommentPageHooks() {
  const comment = useComment();
  const auth = useAuth();
  const blog = useBlogs();
  const user = useUser();
  const state = comment.state;
  const prev = usePrevious(state);
  const loggedInId: any = auth.state.user?.id;
  const blogId: any = blog.state.getBlog.data?.id;
  const allComments: any = state.getComments.data?.filter((comment: AllCommentsState) => comment.parentId === null);
  const allReplies: any = state.getComments.data?.filter((comment: AllCommentsState) => comment.parentId !== null);
  const allUsers = user.state.allUser.data;
  const [comments, setComments] = useState<any>(allComments);
  const byMe =
    state.getCommentById.data?.userId === auth.state.user?.id;

  console.log("all comments", state.getComments.data);
  

  const [addComment, setAddComment] = useState<AddCommentPayload>({
    userId: loggedInId,
    articleId: blogId,
    content: '',
  });

  useEffect(() => {
    user.allUser();
  }, []);

  useEffect(() => {
    if (blogId) {
      comment.getComments(blogId);
    }
    setAddComment({ ...addComment, userId: loggedInId, articleId: blogId });
  }, [loggedInId, blogId]);


  useEffect(() => {
    if (prev?.getComments.loading) {
      setComments(allComments);
    }
  }, [state]);

  useEffect(() => {
    if (prev?.editComment.loading) {
      if (!state.editComment.loading && !state.editComment.error) {
        if (byMe) {
          successNotification("Yours comment updated successfully");
        } else{
          successNotification(state.editComment.message);
        }
      }
    }
  }, [state]);

  return {
    setAddComment,
    addComment,
    allComments,
    allUsers,
    allReplies,
    blogId
  };
}
