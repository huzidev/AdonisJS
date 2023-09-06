import { AuthSignInPayload, AuthSignUpPayload, IconState } from "./types";

export const initialAuthSignIn: AuthSignInPayload = {
  email: '',
  password: '',
};

export const initialAuthSignUp: AuthSignUpPayload = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  isBlogger: false,
};

export const initialIconState: IconState = {
  // value is for signIn page
  value: false,
  password: false,
  confirmPassword: false,
};
