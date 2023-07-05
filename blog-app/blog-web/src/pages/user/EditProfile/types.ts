export interface UserDetailsEdit {
    username: string;
}

export interface User {
    id: number | undefined;
    username: string;
    role: string;
    isActive: boolean;
    isVerified: boolean;
    isBanned: boolean;
}