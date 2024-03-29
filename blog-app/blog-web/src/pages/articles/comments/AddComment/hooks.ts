  import { useEffect, useState } from "react";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { useComment } from "store/comment";
import { Comment } from "store/comment/types";
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
    const loggedInId: number = auth.state.user?.id!;
    const blogId: number = blog.state.getBlog.data?.id!;
    const ownerId: number = blog.state.getBlog.data?.ownerId!;
    const commentsState = state.getById.data;
    // allComments will either be array of comments or just empty []
    const allComments: Comment[] = commentsState?.filter((comment: AllCommentsState) => comment.parentId === null) ?? [];
    const allReplies: Comment[] = commentsState?.filter((comment: AllCommentsState) => comment.parentId !== null) ?? [];
    const allUsers = user.state.allUser.data;
    // const [userDetails, setUserDetails] = useState<any>();
    const userDetails = loggedInId === ownerId ? auth.state.user : user.state.getUser.data;

    const [addComment, setAddComment] = useState<AddCommentPayload>({
      userId: loggedInId,
      articleId: blogId,
      content: '',
      // parentId is for replies only
      parentId: null
    });

    useEffect(() => {
      // fetching all users to get username and roles for all comments
      // and only fetch allUsers when their is comments 
      if (prev?.getById.loading && allComments.length) {
        user.allUser();
      }
    }, [state.getById]);

    useEffect(() => {
      // prevId?.loading so when user go to new blog page then wait till id is fetched of that blog otherwise the previous blog's comments will fetched first then the new blog's comment
      if (prevId?.loading) {
        if (blogId) {
          comment.getById(blogId);
        }
      }
      setAddComment({ ...addComment, articleId: blogId });
    }, [loggedInId, blogId]);

    useEffect(() => {
      if (prev?.getById.loading) {
        if (!state.getById.loading && !state.getById.error) {
          if (state.getById.data?.length) {
            successNotification(state.getById.message)
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
      loggedInId,
      userDetails,
      ownerId
    };
  }
