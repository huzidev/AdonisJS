import { User, UserDetailsEdit } from "./types";

export const detailsMe: UserDetailsEdit = {
    username: ''
}

export const detailsId: User = {
    username: '',
    role: '',
    isVerified: false,
    isBanned: false,
    isActive: false,
}

export const detailsCreateUser: User = {
    username: '',
    email: '',
    role: '',
    isVerified: false,
    isActive: false,
    password: '',
    confirmPassword: ''
}