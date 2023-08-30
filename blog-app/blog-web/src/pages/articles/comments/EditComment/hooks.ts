import { useEffect } from "react";
import { useComment } from "store/comment";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";

export function useEditCommentPageHooks() {
  const comment = useComment();
  const state = comment.state;
  const prev = usePrevious(state);

  useEffect(() => {
    if (prev?.getCommentById.loading) {
      if (!state.getCommentById.loading && !state.getCommentById.error) {
        successNotification(state.getCommentById.message);
      }
    }
  }, [state]);
}
