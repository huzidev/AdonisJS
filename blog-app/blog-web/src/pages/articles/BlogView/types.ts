export interface BlogState {
    title: string;
    image: string; 
    content: string;
}

export interface ReactionsState {
    likes: number
    dislikes: number
}

export interface AddReactionState {
    userId: number;
    articleId: number;
}