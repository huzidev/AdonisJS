import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useComments } from "store/comment";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";

export function useEditCommentPageHooks() {
    const comment = useComments();
    const params: any = useParams();
    const commentState = comment.state;
    const prev = usePrevious(commentState);
    useEffect(() => {
        comment.getById(params.id);
    }, []);

    useEffect(() => {
        if (prev?.getCommentById.loading) {
            if (!commentState.getCommentById.loading && !commentState.getCommentById.error) {
                successNotification(commentState.getCommentById.message)
            }
        }
    }, [commentState])
}
