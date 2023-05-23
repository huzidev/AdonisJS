import { useEffect } from "react";
import { getBlogs } from "../../../../store/articles/actions";
import { useAppDispatch } from "../../../../store/hooks/hooks";

export function useBlogsPageHooks(): void {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getBlogs());
    }, [])

}
