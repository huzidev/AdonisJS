export interface BlogState {
    id: number;
    slug: string;
    title: string;
    image: string;
    content: string;
    ownerId: number
    createdAt: string
}

export interface GetBlogsState {
    blogs: BlogState
}

export interface AllBlogsState {
    allBlogs: GetBlogsState
}

