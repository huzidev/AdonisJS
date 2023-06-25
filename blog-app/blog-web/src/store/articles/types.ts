import { User } from "store/auth/types";
import { SubState } from "store/types";

// for getBlog just title and content is required
export interface AddBlogPayload {
  title: string;
  content: string;
  image: string;
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
  owner: User
}

export interface AllBlogs extends SubState {
  data?: Blog[];
}

export interface getBlogById extends SubState {
  data?: Blog;
}

export interface BlogState extends SubState {
  data?: Blog[] | null;
  getBlogs?: AllBlogs;
}
