import { useEffect, useState } from "react";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { useComments } from "store/comment";
import { AddCommentState } from "./types";

export function useCommentPageHooks() {
  const comment = useComments();
  const auth = useAuth();
  const blog = useBlogs();
  const loggedInId: any = auth.state.user?.id;
  const blogId: any = blog.state.getBlog.data?.id;
  const allComments: any = comment.state.getComments.data;
  const [comments, setComments] = useState<any>(allComments);

  const [content, setContent] = useState<AddCommentState>({
    userId: loggedInId,
    articleId: blogId,
    comment: '',
  });

  useEffect(() => {
    if (blogId) {
      comment.getComments({ articleId: blogId });
    }
    setContent({ ...content, userId: loggedInId, articleId: blogId });
  }, [loggedInId, blogId]);

  useEffect(() => {
    setComments(allComments)
  }, [comments])

  return {
    setContent,
    content,
    allComments
  }
}
