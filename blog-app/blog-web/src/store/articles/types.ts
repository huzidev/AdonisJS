import { User } from "store/auth/types";
import { PaginationMeta, SortType, SubState } from "store/types";

// for getBlog just title and content is required
export interface AddBlogPayload {
  title: string;
  content: string;
  image: string;
}

export interface GetBlogPayload {
  slug: string;
}

// partial for optional
export interface UpdateBlogPayload extends Partial<AddBlogPayload> {
  id: number | null;
}

export interface Blog extends AddBlogPayload {
  id: number;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
  slug: string;
  owner: User;
}

export interface AddFavoriteBlogPayload {
  userId: number | null | undefined;
  articleId: number;
  ownerId: number;
}

export interface RemoveFavoriteBlogPayload {
  articleId: number;
  ownerId: number;
}

export interface BlogSortReq {
  createdAt?: SortType;
}

export interface AllBlogs extends SubState {
  data: Blog[];
  meta: PaginationMeta | null | any;
  filters?: boolean;
  page?: number;
}

export interface FiltersType {
  sort: string;
}

export interface GetBlogsByIdTest {
  page: number
  userId: number;
  filters?: FiltersType;
}

export interface GetBlogsById {
  page: number
  userId: number;
}

export interface getBlogById extends SubState {
  // optional is needed because in getBlog data is required and in updateBlog data is not required
  data?: Blog | null;
}

export interface BlogState {
  getBlogs: AllBlogs;
  getBlogsList: AllBlogs;
  getBlogsById: AllBlogs;
  getMyList: AllBlogs;
  getFavoriteBlogs: AllBlogs;
  removeFavoriteBlog: SubState;
  getBlog: getBlogById;
  updateBlog: getBlogById;
  addBlog: SubState;
  addFavoriteBlog: SubState;
  deleteBlog: SubState;
}
