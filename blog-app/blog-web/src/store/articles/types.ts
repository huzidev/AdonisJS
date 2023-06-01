// for getBlog just title and content is required
export interface AddBlogReq {
    title: string;
    content: string;
    image: string;
}

export interface UpdateByIdReq {
    id: number | null;
    title?: string;
    content?: string;
    image?: string;
}

export interface BlogDataState extends AddBlogReq {
    ownerId: number;
    id: number;
    slug: string;
}

// export interface BlogUpdate extends BlogDetails {
// }

export interface BlogState {
    allBlogs: BlogDataState[];
    getBlog: BlogDataState | {};
}