import { SubState } from "store/types";

export interface UserUpdatePayload {
    username?: string;    
}

export interface UpdateUserId extends  SubState {
    data?: UserUpdatePayload | null
}

export interface UserState {
    updateUser?: UpdateUserId;
}