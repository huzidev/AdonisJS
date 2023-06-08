import { User } from "store/auth/types";
import { SubState } from "store/types";

// for getBlog just title and content is required
export interface BlogGeneral {
  title: string;
  content: string;
  image: string;
}

export interface BlogUpdateReq {
  id: number | null;
  title?: string;
  content?: string;
  image?: string;
}

export interface BlogDetail extends BlogGeneral {
  id: number;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
  slug: string;
  owner: User
}

export interface BlogState extends SubState {
  data?: BlogDetail[];
  getBlog?: BlogUpdateReq | null;
}
