export interface UserDetailsEdit {
    username: string;
}

export interface User {
    username: string;
    role: string;
    isActive: boolean;
    isVerified: boolean;
    isBanned: boolean;
}