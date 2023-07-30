export interface UserDetailState {
    id: number | null;
    username: string;
    email: string;
    createdAt: string;
    role: string;
}

export type ParamsId = {
    // params.id will be in string format and then we can Number(params.id) to make it number
    id: string
}