export interface BlogState {
    title: string;
    image: string; 
    content: string;
}

export interface ReactionsState {
    // likes: {
    //     totalLikes: number
    // }
    // dislikes: {
    //     totalDislikes: number
    // }
    likes: number
    dislikes: number
}