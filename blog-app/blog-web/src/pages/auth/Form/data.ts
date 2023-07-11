import { AuthSignInPayload, AuthSignUpPayload } from "./types";

export const userSignInData: AuthSignInPayload = {
    email: "", 
    password: ""
}

export const userSignUpData: AuthSignUpPayload = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    isBlogger: false
}