export interface BlogState {
    title: string;
    image: string; 
    content: string;
}

export interface AddReactionState {
    userId: number;
    articleId: number;
}

interface ReactionState {
    isLike: boolean;
    isDislike: boolean;
}

export interface AllReactionsState {
    totalLikes: number | null;
    totalDislikes: number | null;
    user: ReactionState
}