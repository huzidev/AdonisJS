import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useComments } from "store/comment";

export function useEditCommentPageHooks() {
    const comment = useComments();
    const params: any = useParams();
    useEffect(() => {
        comment.getById(params.id);
    }, []);
}
