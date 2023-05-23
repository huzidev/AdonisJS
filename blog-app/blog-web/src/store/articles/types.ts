export interface BlogDetails {
    id: number;
    custom_id: number;
    title: string;
    image: string
    content: string
}

export interface BlogState {
    blogs: BlogDetails[];
}