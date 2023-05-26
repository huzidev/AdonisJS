import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlog } from "../../../../store/articles/actions";
import { useAppDispatch } from "../../../../store/hooks/hooks";

export function useEditBlogPageHooks(): void {
    const dispatch = useAppDispatch();
    const params = useParams();

    const [test, setTest] = useState({name: "huzi", id: 5});

    const slug: string | undefined = params.slug;

     useEffect(() => {
        dispatch(getBlog(slug!))
    }, [])

}
