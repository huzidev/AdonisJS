import { useSelector } from "react-redux";
import { useAppDispatch } from "store/hooks/hooks";
import * as actions from "./actions";
import { AddReactionPayload, ReactionState } from "./types";

export const useReactions = () => {
  const dispatch = useAppDispatch();
  const state = useSelector((state: any) => state.reactions) as ReactionState;
  const addReaction = (payload: AddReactionPayload) => dispatch(actions.addReaction(payload));

  return {
    state,
    addReaction
  };
};
