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

export interface SubState {
  loading: boolean;
  error: boolean;
}

export interface InitState extends SubState {
  init: boolean;
}

export interface BlogDataState extends AddBlogReq {
    ownerId: number;
    id: number;
    slug: string;
}

// export interface BlogUpdate extends BlogDetails {
// }

export interface BlogState {
    currPage: number;
    loading: boolean;
    error: string;
    allBlogs: BlogDataState[];
    getBlog: BlogDataState | {};
}