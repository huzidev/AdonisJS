import { Blog } from "store/articles/types";

export interface UserDetailState {
    id: number | null;
    username: string;
    email: string;
    createdAt: string;
    role: string;
}

// while using interface it's giving error
export type ParamsId = {
    // params.id will be in string format and then we can Number(params.id) to make it
    id: string
}

interface searchReq {
    sort: string;
}

export interface ViewProfileStateHandler {
    userDetails: UserDetailState;
    userBlogs: Blog[];
    loadMore: () => void;
    currentPage: number;
    currentPageFvrt: number;
    lastPageFvrt: number;
    lastPage: number;
    isMe: boolean;
    isRole: string;
    allReactions: any;
    search: searchReq;
    allComments: any;
}