export interface UserSignInState {
    email: string;
    password: string;
}

export interface UserState extends UserSignInState {
    username: string;
    passwordConfirmation: string;
}

export interface UserDetail {
    id: number | null;
    email: string;
    username: string;    
}

export interface UserDetailState {
    authToken: "" | null | undefined
    getUser: UserDetail | {}
}