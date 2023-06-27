import { User } from "store/auth/types";
import { SubState } from "store/types";

export interface UserUpdatePayload {
    username?: string;    
}

export interface UpdateUserId extends SubState {
    data?: User | null
}

export interface UserState {
    user: User | null
    updateUser: UpdateUserId;
}