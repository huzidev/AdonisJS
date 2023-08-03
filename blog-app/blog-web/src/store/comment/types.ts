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

export interface GetCommentsState {
  articleId: number;
  data: Comment;
}

export interface CommentState {
  addComment: SubState;
  getComments: SubState;
}