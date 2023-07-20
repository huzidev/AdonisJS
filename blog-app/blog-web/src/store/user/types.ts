import { User, UserRole } from "store/auth/types";
import { PaginationMeta, SortType, SubState } from "store/types";

export interface UpdateMePayload {
    username?: string;    
}

export interface UserFiltersReq {
  username?: string;
  role?: UserRole;
  isActive?: boolean;
  isVerified?: boolean;
  isBanned?: boolean;
  createdAtBefore?: string;
  createdAtAfter?: string;
  updatedAtBefore?: string;
  updatedAtAfter?: string;
  sort?: UserSortReq;
}

export interface UserSortReq {
  username?: SortType;
  role?: SortType;
  isVerified?: SortType;
  isActive?: SortType;
  isBanned?: SortType;
  createdAt?: SortType;
  updatedAt?: SortType;
}

export interface UpdateByIdPayload extends Partial<SubState> {
    id?: number;
    data?: User | null;
}

export interface UpdateUserId extends SubState {
    data?: User | null
}

export interface AllUserList extends SubState {
    data?: User[] | null;
}

export interface UserById extends SubState {
    data?: User | null;
}

export interface UserByPage extends SubState {
    data?: User[] | null;
    meta: PaginationMeta | null;
    filters?: UserSortReq | null;
    page?: number;
}

export interface UserState {
    user: User | null;
    allUser: AllUserList;
    updateMe: UpdateUserId;
    updateById: UpdateByIdPayload;
    getUser: UserById;
    createUser: SubState;
    getUserPage: UserByPage;
}