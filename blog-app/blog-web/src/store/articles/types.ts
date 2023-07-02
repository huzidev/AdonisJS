import { User } from "store/auth/types";
import { PaginationMeta, SubState } from "store/types";

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

export interface GetBlogsById {
  userId: number;
  page: number;
}

export interface AllBlogs extends SubState {
  data: Blog[];
  meta: PaginationMeta | null;
}

export interface getBlogById extends SubState {
  // optional is needed because in getBlog data is required and in updateBlog data is not required
  data?: Blog | null;
}

export interface BlogState {
  getBlogs: AllBlogs;
  getBlogsById: AllBlogs;
  getBlog: getBlogById;
  updateBlog: getBlogById;
  addBlog: SubState;
  deleteBlog: SubState;
}
