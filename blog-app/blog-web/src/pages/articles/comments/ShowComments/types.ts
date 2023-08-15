export interface PropsState {
  ownerId: number;
}
export interface AddCommentPayload {
  userId: number;
  articleId: number;
  content: string;
}

export interface AllCommentsState extends AddCommentPayload {
  id: number;
  parentId?: number;
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