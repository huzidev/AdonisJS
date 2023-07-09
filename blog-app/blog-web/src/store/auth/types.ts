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
    isActive: boolean;
    isVerified: boolean;
    isBanned: boolean;
    role: UserRole;
}

export interface AuthInitState extends SubState {
    init: boolean;
}

export interface AuthVerificationCode extends SubState {
    code: string;
}

export interface AuthVerificationPayload {
    code: string;
}

export interface AuthState {
    user: User | null;
    signInState: SubState;
    signUpState: SubState;
    init: AuthInitState;
}

export const roles = ['user', 'blogger', 'admin', 'super-admin'] as const 
export type UserRole = typeof roles[number];