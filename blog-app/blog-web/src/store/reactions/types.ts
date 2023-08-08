export interface AddReactionPayload {
    userId: number;
    articleId: number;
    isLike: boolean;
    isDislike: boolean;
}