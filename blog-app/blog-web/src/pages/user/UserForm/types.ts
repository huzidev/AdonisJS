export interface UserDetailsEdit {
    username: string;
}

export interface User {
    email?: string;
    username: string;
    role: string;
    isActive: boolean;
    isVerified: boolean;
    isBanned: boolean;
    password?: string;
    passwordConfirmation?: string;
}