import { useEffect } from "react";
import { getBlogs } from "../../../store/articles/actions";
import { useAppDispatch } from "../../../store/hooks/hooks";

export function useBlogsPageHooks(): void {
    const dispatch = useAppDispatch();
    const blogs = useBlogs();

    useEffect(() => {
        if (!blogs.state.data.length) {
            dispatch(getBlogs());
        }
    }, [])

}
