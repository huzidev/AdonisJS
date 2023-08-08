import { useSelector } from "react-redux";
import { useAppDispatch } from "store/hooks/hooks";
import * as actions from "./actions";
import { AddReactionPayload, GetReactionPayload, ReactionState } from "./types";

export const useReactions = () => {
  const dispatch = useAppDispatch();
  const state = useSelector((state: any) => state.reactions) as ReactionState;
  const addReaction = (payload: AddReactionPayload) => dispatch(actions.addReaction(payload));
  const getReactions = (payload: GetReactionPayload) => dispatch(actions.getReactions(payload));
  const getAllReactions = () => dispatch(actions.getAllReactions());

  return {
    state,
    addReaction,
    getReactions,
    getAllReactions
  };
};
