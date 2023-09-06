import qs from "query-string";
import { ResetPasswordCode } from "./types";

const params: any = {
  ...qs.parse(window.location.search),
};

export const resetPasswordState: ResetPasswordCode = {
  email: params.email,
  code: '',
  password: '',
  confirmPassword: '',
};
