import { SubState } from "store/types";

export interface GetReactionPayload {
  userId?: number;
  articleId: number;
}

export interface AddReactionPayload extends GetReactionPayload {
  isLike: boolean;
  isDislike: boolean;
}

export interface Reactions extends SubState {
  data?: AddReactionPayload;
}

export interface ReactionState {
  addReaction: SubState;
  getReactions: Reactions;
  getAllReactions: Reactions;
}
