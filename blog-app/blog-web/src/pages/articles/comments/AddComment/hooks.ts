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
    const prevId = usePrevious(blog.state.getBlog);
    const loggedInId: any = auth.state.user?.id;
    const blogId: any = blog.state.getBlog.data?.id;
    const commentsState = state.getComments.data;
    const allComments: any = commentsState?.filter((comment: AllCommentsState) => comment.parentId === null);
    const allReplies: any = commentsState?.filter((comment: AllCommentsState) => comment.parentId !== null);
    const allUsers = user.state.allUser.data;

    console.log("blogId", blogId);
    

    const [addComment, setAddComment] = useState<AddCommentPayload>({
      userId: loggedInId,
      articleId: blogId,
      content: '',
      parentId: null
    });

    useEffect(() => {
      // fetching all users to get username and roles for all comments
      user.allUser();
    }, []);

    useEffect(() => {
      if (prevId?.loading) {
        if (blogId) {
          comment.getComments(blogId);
        }
      }
      setAddComment({ ...addComment });
    }, [loggedInId, blogId]);

    useEffect(() => {
      if (prev?.getComments.loading) {
        if (!state.getComments.loading && !state.getComments.error) {
          if (state.getComments.data?.length) {
            successNotification(state.getComments.message)
          }
        }
      }
      if (prev?.editComment.loading) {
        if (!state.editComment.loading && !state.editComment.error) {
          successNotification(state.editComment.message);
        }
      }
      if (prev?.deleteComment.loading) {  
        if (!state.deleteComment.loading && !state.deleteComment.error) {
          successNotification(state.deleteComment.message);
        }
      }
      if (prev?.addComment.loading) {
        if (!state.addComment.loading && !state.addComment.error) {
          successNotification(state.addComment.message);
        }
      }
    }, [state]);

    return {
      setAddComment,
      addComment,
      allComments,
      allUsers,
      allReplies,
      blogId,
    };
  }
