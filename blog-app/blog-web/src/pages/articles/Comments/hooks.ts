import { useEffect, useState } from "react";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { AddCommentState } from "./types";

export function useCommentPageHooks() {
  const auth = useAuth();
  const blog = useBlogs();
  const loggedInId: any = auth.state.user?.id;
  const blogId: any = blog.state.getBlog.data?.id;

  const [content, setContent] = useState<AddCommentState>({
    userId: loggedInId,
    articleId: blogId,
    comment: '',
  });

  useEffect(() => {
    setContent({ ...content, userId: loggedInId, articleId: blogId });
  }, [loggedInId, blogId]);

  return {
    setContent,
    content
  }
}
