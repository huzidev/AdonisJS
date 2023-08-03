export interface AddCommentState {
  userId: number;
  articleId: number;
  comment: string;
}

export interface AllComments extends AddCommentState {
  createdAt: string;
  updatedAt: string;
}
