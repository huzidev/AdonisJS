export interface ResetPasswordPayload {
    code: string;
    password: string;
    passwordConfirmation: string;
}