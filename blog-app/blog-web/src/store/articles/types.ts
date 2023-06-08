import { User } from "store/auth/types";
import { SubState } from "store/types";

// for getBlog just title and content is required
export interface BlogAddPayload {
  title: string;
  content: string;
  image: string;
}

export interface BlogUpdatePayload {
  id: number | null;
  title?: string;
  content?: string;
  image?: string;
}

export interface BlogDetail extends BlogAddPayload {
  id: number;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
  slug: string;
  owner: User
}

export interface BlogList extends SubState {
  data?: BlogDetail[];
  getBlog?: BlogUpdatePayload | null;
}
