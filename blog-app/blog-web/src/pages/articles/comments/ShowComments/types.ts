export interface PropsState {
  userId: number;
}
export interface AddCommentState extends PropsState {
  articleId: number;
  comment: string;
}

export interface AllCommentsState extends AddCommentState {
  id: number;
  createdAt: string;
  updatedAt: string;
}