export interface UserSignInState {
    email: string;
    password: string;
}

export interface UserState extends UserSignInState {
    username: string;
    passwordConfirmation: string;
}

export interface UserDataState {
    ownerId: number;    
}