export interface UserDetailsEdit {
    username: string;
}

export interface User {
    id: number | null;
    username: string;
    role: string;
    isActive: boolean;
    isVerified: boolean;
    isBanned: boolean;
}