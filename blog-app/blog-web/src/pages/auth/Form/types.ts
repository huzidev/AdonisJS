export interface BooleanState {
  value: boolean;
  valuePass: boolean;
  valueConfPass: boolean;
}

export interface AuthSignInPayload {
    email: string
    password: string
}

export interface AuthSignUpPayload {
    username: string
    email: string
    password: string
    passwordConfirmation: string
}