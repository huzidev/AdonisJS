import { SubState } from "store/types";

export interface AddCommentPayload {
  userId: number;
  articleId: number;
  comment: string;
}

export interface Comment extends AddCommentPayload {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetCommentsState extends SubState {
  articleId?: number;
  data?: Comment[] | null;
}

export interface CommentState {
  addComment: SubState;
  getComments: GetCommentsState;
  deleteComment: SubState;
}
