import { useSelector } from "react-redux";
import { useAppDispatch } from "store/hooks/hooks";
import * as actions from "./actions";
import { AddCommentPayload, CommentState, GetCommentsState } from "./types";

export const useComments = () => {
  const dispatch = useAppDispatch();
  const state = useSelector((state: any) => state.comments) as CommentState;
  const addComment = (payload: AddCommentPayload) => dispatch(actions.addComment(payload));
  const getComments = (payload: GetCommentsState) => dispatch(actions.getComments(payload));

  return {
    state,
    addComment,
    getComments
  };
};
