import { User, UserRole } from "store/auth/types";
import { SubState } from "store/types";

export interface UpdateMePayload {
    username?: string;    
}

export interface UpdateByIdPayload extends SubState {
    id?: number;
    username?: string;
    email?: string;
    isActive?: boolean;
    isVerified?: boolean;
    isBanned?: boolean;
    role?: UserRole;
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

export interface UserState {
    user: User | null;
    allUser: AllUserList;
    updateMe: UpdateUserId;
    updateById: UpdateByIdPayload;
    getUser: UserById;
}