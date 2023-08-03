export interface AddCommentState {
  userId: number;
  articleId: number;
  comment: string;
}

export interface AllCommentsState extends AddCommentState {
  id: number;
  createdAt: string;
  updatedAt: string;
}
