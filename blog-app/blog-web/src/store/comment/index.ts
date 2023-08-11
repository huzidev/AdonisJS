import { useSelector } from "react-redux";
import { useAppDispatch } from "store/hooks/hooks";
import * as actions from "./actions";
import { AddCommentPayload, CommentState, EditCommentPayload } from "./types";

export const useComment = () => {
  const dispatch = useAppDispatch();
  const state = useSelector((state: any) => state.comments) as CommentState;
  const addComment = (payload: AddCommentPayload) => dispatch(actions.addComment(payload));
  const getComments = (payload: number) => dispatch(actions.getComments(payload));
  const getById = (payload: number) => dispatch(actions.getCommentById(payload));
  const deleteComment = (payload: number) => dispatch(actions.deleteComment(payload));
  const editComment = (payload: EditCommentPayload) => dispatch(actions.editComment(payload));

  return {
    state,
    addComment,
    getComments,
    deleteComment,
    editComment,
    getById
  };
};
