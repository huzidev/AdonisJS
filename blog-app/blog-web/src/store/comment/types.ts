import { SubState } from "store/types";

export interface AddCommentPayload {
  userId: number;
  articleId: number;
  parentId?: number | null;
  content: string;
}

export interface Comment extends AddCommentPayload {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetCommentsState extends SubState {
  articleId?: number;
  data?: Comment[] | null;
  comments?: Comment[] | null;
  replies?: Comment[] | null;
  toReply?: Comment[] | null;
  total?: number;
}

export interface GetCommentByIdState extends SubState {
  id?: number;
  data?: Comment | null;
}

export interface EditCommentPayload extends SubState {
  id?: number;
  content: string;
}

export interface CommentState {
  addComment: SubState;
  getComments: GetCommentsState;
  getCommentById: GetCommentByIdState;
  editComment: GetCommentByIdState;
  deleteComment: SubState;
}
