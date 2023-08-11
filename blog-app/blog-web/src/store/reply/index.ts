import { useSelector } from "react-redux";
import { useAppDispatch } from "store/hooks/hooks";
import * as actions from "./actions";
import { AddReplyPayload, EditReplyPayload, ReplyState } from "./types";

export const useReply = () => {
  const dispatch = useAppDispatch();
  const state = useSelector((state: any) => state.replies) as ReplyState;
  const addReply = (payload: AddReplyPayload) => dispatch(actions.addReply(payload));
  const getReplies = (payload: number) => dispatch(actions.getReplies(payload));
  const getById = (payload: number) => dispatch(actions.getReplyById(payload));
  const deleteReply = (payload: number) => dispatch(actions.deleteReply(payload));
  const editReply = (payload: EditReplyPayload) => dispatch(actions.editReply(payload));

  return {
    state,
    addReply,
    getReplies,
    deleteReply,
    editReply,
    getById
  };
};
