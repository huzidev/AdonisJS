// for getBlog just title and content is required
export interface BlogData {
    title: string;
    content: string;
}

export interface BlogUpdate extends BlogData {
    image: string;
    id: number;
}

export interface BlogDetails extends BlogUpdate {
    custom_id: number;
}

export interface BlogState {
    allBlogs: BlogDetails[];
    getBlog: BlogData | {};
}