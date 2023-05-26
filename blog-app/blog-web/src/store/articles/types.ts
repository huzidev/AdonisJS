// for getBlog just title and content is required
export interface BlogData {
    title: string;
    content: string;
}

export interface AddBlogState extends BlogData {
    image: string;
}

export interface BlogDetails extends AddBlogState {
    id: number;
    slug: string;
}

// export interface BlogUpdate extends BlogDetails {
// }

export interface BlogState {
    allBlogs: BlogDetails[];
    getBlog: BlogData | {};
}