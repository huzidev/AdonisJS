import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBlogs } from "store/articles";

export function useGetBlogPageHooks(): void {
    const params: any = useParams();
    const blog = useBlogs();

     useEffect(() => {
    blog.getBlog(params.slug)
  }, [])

}
