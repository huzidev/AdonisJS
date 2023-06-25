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

export interface BlogDetail extends AddBlogPayload {
  id: number;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
  slug: string;
  owner: User
}

export interface BlogState {
  blogsListState: BlogList;
}

export interface BlogList extends SubState {
  data?: BlogDetail[];
  getBlogs?: BlogDetail | null;
}
