import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "store/auth";
import { useComment } from "store/comment";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";

export function useEditCommentPageHooks() {
  const comment = useComment();
  const auth = useAuth();
  const params: any = useParams();
  const state = comment.state;
  const prev = usePrevious(state);
  // when comment's userId and loggedIn user id mathces then show Yours comment else comment by id
  const byMe =
    comment.state.getCommentById.data?.userId === auth.state.user?.id;

  useEffect(() => {
    comment.getById(params.id);
  }, []);

  useEffect(() => {
    if (prev?.getCommentById.loading) {
      successNotification(state.getCommentById.message);
    }
  }, [state]);
}
