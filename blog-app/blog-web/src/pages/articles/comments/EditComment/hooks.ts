import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useComment } from "store/comment";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";

export function useEditCommentPageHooks() {
  const comment = useComment();
  const params: any = useParams();
  const state = comment.state;
  const prev = usePrevious(state);

  useEffect(() => {
    comment.getById(params.id);
  }, []);

  useEffect(() => {
    if (prev?.getCommentById.loading) {
      successNotification(state.getCommentById.message);
    }
  }, [state]);
}
