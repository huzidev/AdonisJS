import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBlogs } from "store/articles";
import { usePrevious } from "utils/hooks";

export function useEditBlogPageHooks(): void {
    const blog = useBlogs();
    const params = useParams();
    const state = blog.getBlog;
    const prev = usePrevious(state);
    const slug: any = params.slug;
    useEffect(() => {
        blog.getBlog(slug)
    }, [])

    useEffect(() => {

    }, [state])

}
