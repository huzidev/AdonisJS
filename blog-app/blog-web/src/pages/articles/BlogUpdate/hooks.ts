import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBlogs } from "store/articles";

export function useEditBlogPageHooks(): void {
    const blogs = useBlogs();
    const params = useParams();
    const slug: any = params.slug;
    useEffect(() => {
        blogs.getBlog(slug)
    }, [])
}
