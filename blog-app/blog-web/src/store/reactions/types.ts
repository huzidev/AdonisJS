import { SubState } from "store/types";

export interface AddReactionState extends SubState {
    userId: number;
    articleId: number;
    isLike: boolean;
    isDislike: boolean;
}

export interface ReactionState {
  addReaction: AddReactionState;
}