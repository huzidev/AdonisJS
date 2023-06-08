import { SubState } from "store/types";

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

export interface InitState extends SubState {
  init: boolean;
}

export interface BlogDetail extends AddBlogReq {
    ownerId: number;
    id: number;
    slug: string;
}

// export interface BlogUpdate extends BlogDetails {
// }

export interface BlogState extends SubState {
    currPage: number;
    data?: BlogDetail[];
    getBlog?: UpdateByIdReq | null;
}