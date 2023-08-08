import { SubState } from "store/types";

export interface AddReactionPayload {
    userId: number;
    articleId: number;
    isLike: boolean;
    isDislike: boolean;
}

export interface GetReactionState extends SubState {
    data?: AddReactionPayload[] | null;
}

export interface ReactionState {
  addReaction: SubState;
}