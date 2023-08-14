import { useEffect, useState } from "react";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { useComment } from "store/comment";
import { useUser } from "store/user";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";
import { AddCommentState } from "./types";

export function useCommentPageHooks() {
  const comment = useComment();
  const auth = useAuth();
  const blog = useBlogs();
  const user = useUser();
  const state = comment.state;
  const prev = usePrevious(state);
  const loggedInId: any = auth.state.user?.id;
  const blogId: any = blog.state.getBlog.data?.id;
  const allComments: any = comment.state.getComments.comments;
  const allReplies: any = comment.state.getComments.replies;
  const toReply: any = comment.state.getComments.toReply;
  const allUsers = user.state.allUser.data;
  const [comments, setComments] = useState<any>(allComments);
  const byMe =
    state.getCommentById.data?.userId === auth.state.user?.id;

  const [content, setContent] = useState<AddCommentState>({
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
    setContent({ ...content, userId: loggedInId, articleId: blogId });
  }, [loggedInId, blogId]);

  useEffect(() => {
    setComments(allComments);
  }, [comments]);

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
    setContent,
    content,
    allComments,
    allUsers,
    allReplies,
    toReply
  };
}
