import { SubState } from "store/types";

export interface AddCommentPayload {
    userId: number;
    articleId: number;
    comment: string;
}

export interface CommentState {
  addComment: SubState;
}