import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlog } from "../../../store/articles/actions";
import { useAppDispatch } from "../../../store/hooks/hooks";

export function useGetBlogPageHooks(): void {
    const dispatch = useAppDispatch();
    const params = useParams();
    const slug: any = params.slug;

     useEffect(() => {
        dispatch(getBlog(slug!))
    }, [])

}
