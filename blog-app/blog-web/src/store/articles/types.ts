// for getBlog just title and content is required
export interface AddBlogState {
    title: string;
    content: string;
    image: string;
}

export interface BlogDataState extends AddBlogState {
    id: number;
    slug: string;
}

// export interface BlogUpdate extends BlogDetails {
// }

export interface BlogState {
    allBlogs: BlogDataState[];
    getBlog: BlogDataState | {};
}