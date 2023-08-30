import { User } from "store/auth/types";
import { Comment } from "store/comment/types";

export interface PropsState {
    comment: string;
    allUsers: User
    allReplies: Comment;
    isBlogOwner: boolean;
    blogId: number;
}

export interface ReplyState {
    userId: number,
    articleId: number,
    parentId?: number | null,
    content: string,
}

export interface EditCommentPayload {
    id: number | null;
    userId: number | null;
    content: string;
}