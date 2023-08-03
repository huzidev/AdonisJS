export interface AddCommentState {
  userId: number;
  articleId: number;
  comment: string;
}

export interface AllCommentsState extends AddCommentState {
  createdAt: string;
  updatedAt: string;
}
