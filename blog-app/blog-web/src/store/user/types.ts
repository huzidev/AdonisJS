import { SubState } from "store/types";

export interface UserUpdatePayload extends SubState {
    id: number | null;
    username: string;    
}

export interface UserState {
    updateUser: UserUpdatePayload;
}