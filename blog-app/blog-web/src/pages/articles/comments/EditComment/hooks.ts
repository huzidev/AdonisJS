import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useComments } from "store/comment";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";

export function useEditCommentPageHooks() {
    const comment = useComments();
    const params: any = useParams();
    const state = comment.state;
    const prev = usePrevious(state);
    useEffect(() => {
        comment.getById(params.id);
    }, []);

    useEffect(() => {
        if (prev?.getCommentById.loading) {
            if (!state.getCommentById.loading && !state.getCommentById.error) {
                successNotification(state.getCommentById.message)
            }
        }
    }, [state])
}
