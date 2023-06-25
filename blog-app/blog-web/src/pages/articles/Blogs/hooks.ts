import { useEffect } from "react";
import { useBlogs } from "store/articles";
import { useAppDispatch } from "../../../store/hooks/hooks";

export function useBlogsPageHooks(): void {
    const dispatch = useAppDispatch();
    const blogs = useBlogs();

    useEffect(() => {
        blogs.getBlogs();
        console.log("blogs", blogs);
    }, [])

}
