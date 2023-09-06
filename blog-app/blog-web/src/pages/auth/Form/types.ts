export interface IconState {
  value?: boolean;
  password: boolean;
  confirmPassword: boolean;
}

export interface AuthSignInPayload {
    email: string
    password: string
}

export interface AuthSignUpPayload {
    username: string
    email: string
    password: string
    confirmPassword: string
    isBlogger: boolean
}