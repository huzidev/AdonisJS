export interface BlogState {
    id: number;
    slug: string;
    title: string;
    image: string;
    content: string;
    ownerId: number
}

export interface GetBlogsState {
    blogs: BlogState
}

export interface AllBlogsState {
    allBlogs: GetBlogsState
}

