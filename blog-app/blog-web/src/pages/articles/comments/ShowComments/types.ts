export interface PropsState {
  ownerId: number;
}
export interface AddCommentState {
  userId: number;
  articleId: number;
  comment: string;
}

export interface AllCommentsState extends AddCommentState {
  id: number;
  replyId?: number;
  createdAt: string;
  updatedAt: string;
}
