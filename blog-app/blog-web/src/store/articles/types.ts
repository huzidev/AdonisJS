export interface BlogUpdate {
    title: string;
    image: string
    content: string
}

export interface BlogDetails extends BlogUpdate {
    id: number;
    custom_id: number;
}

export interface BlogState {
    allBlogs: BlogDetails[];
}