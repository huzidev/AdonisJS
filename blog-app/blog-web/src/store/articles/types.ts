// for update just title, image and content is required
export interface BlogUpdate {
    id: number;
    title: string;
    image: string
    content: string
}

export interface BlogDetails extends BlogUpdate {
    custom_id: number;
}

export interface BlogState {
    allBlogs: BlogDetails[];
    getBlog: BlogDetails[];
}