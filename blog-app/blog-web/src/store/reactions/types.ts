import { SubState } from "store/types";

export interface AddReactionPayload {
    userId: number;
    articleId: number;
    isLike: boolean;
    isDislike: boolean;
}

export interface GetReactionsState extends SubState {
    data?: AddReactionPayload;
}

export interface ReactionState {
  addReaction: SubState;
  getReactions: GetReactionsState;
}