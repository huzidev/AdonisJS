import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBlogs } from "store/articles";
import { useUser } from "store/user";

export function useGetBlogPageHooks(): void {
    const params: any = useParams();
    const blog = useBlogs();
    const user = useUser();
    const ownerId: any = blog.state.getBlog.data?.ownerId;

    useEffect(() => {
      blog.getBlog(params.slug)
      if (ownerId) {
        user.getById(ownerId);
      }
  }, [ownerId])

}
