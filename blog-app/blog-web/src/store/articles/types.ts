// for update just title, image and content is required
export interface BlogData {
    title: string;
    image: string;
    content: string;
}

export interface BlogUpdate extends BlogData {
    id: number;
}

export interface BlogDetails extends BlogUpdate {
    custom_id: number;
}

export interface BlogState {
    allBlogs: BlogDetails[];
    getBlog: BlogData | {};
}