import { User } from "store/auth/types";
import { SubState } from "store/types";

export interface UpdateMePayload {
    username?: string;    
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

export interface UserState {
    user: User | null;
    allUser: AllUserList;
    updateMe: UpdateUserId;
    updateById: UpdateByIdPayload;
    getUser: UserById;
}