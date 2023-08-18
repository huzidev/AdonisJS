export interface PropsState {
  ownerId: number;
}
export interface AddCommentPayload {
  userId: number;
  articleId: number;
  content: string;
  parentId?: number | null;
}

export interface AllCommentsState extends AddCommentPayload {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface RepliesState {
  id: number;
  userId: number;
  articleId: number;
  commentId: number;
  reply: string;
}