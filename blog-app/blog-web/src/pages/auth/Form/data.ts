import { AuthSignInPayload, AuthSignUpPayload, BooleanState } from "./types";

export const userSignInData: AuthSignInPayload = {
  email: '',
  password: '',
};

export const userSignUpData: AuthSignUpPayload = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  isBlogger: false,
};

export const booleanValues: BooleanState = {
  value: false,
  valuePass: false,
  valueConfPass: false,
};
