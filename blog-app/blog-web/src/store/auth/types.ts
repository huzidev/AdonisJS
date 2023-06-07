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

interface UserSubState {
    loading: boolean;
    error: boolean;
}

export interface UserDetailState extends UserSubState {
    getUser: UserDetail | {}
}