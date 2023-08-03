import { Comment } from "store/comment/types";

export interface AddCommentState {
    userId: number;
    articleId: number;
    comment: string;
}

export interface AllComments {
    data: Comment[]
}