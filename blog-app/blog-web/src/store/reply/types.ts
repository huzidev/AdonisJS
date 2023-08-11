import { SubState } from "store/types";

export interface AddReplyPayload {
  userId: number;
  articleId: number;
  commentId: number;
  reply: string;
}

export interface Reply extends AddReplyPayload {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetRepliesState extends SubState {
  commentId?: number;
  data?: Reply[] | null;
}

export interface GetReplyByIdState extends SubState {
  id?: number;
  data?: Comment | null;
}

export interface EditReplyPayload extends SubState {
  id?: number;
  reply: string;
}

export interface ReplyState {
  addReply: SubState;
  getReplies: GetRepliesState;
  getReplyById: GetReplyByIdState;
  editReply: GetReplyByIdState;
  deleteReply: SubState;
}
