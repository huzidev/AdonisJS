import { SubState } from "store/types";

export interface AuthSignInPayload {
    email: string;
    password: string;
}

export interface AuthSignUpPayload extends AuthSignInPayload {
    username: string;
    passwordConfirmation: string;
}

export interface User {
    id: number | null;
    email: string;
    username: string;    
}

export interface AuthInitState extends SubState {
    init: boolean;
}

export interface AuthState {
    user?: User | null,
    signIn: SubState,
    signUp: SubState,
    init: AuthInitState,
}