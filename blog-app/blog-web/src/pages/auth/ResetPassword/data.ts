import qs from "query-string";
import { ResetPasswordState } from "./types";

const params: any = {
  ...qs.parse(window.location.search),
};

export const initialState: ResetPasswordState = {
  email: params.email,
  code: '',
  password: '',
  confirmPassword: '',
};
