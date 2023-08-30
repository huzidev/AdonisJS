import { User } from "store/auth/types";
import { Comment } from "store/comment/types";

export interface PropsState {
    comment: string;
    allUsers: User
    allReplies: Comment;
    isBlogOwner: boolean;
    blogId: number;
}