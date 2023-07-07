import { SubState } from "store/types";

export interface ResetPasswordSendCodeRequest {
  email: string; // only email is required for reset password code
}

export interface ResetPasswordState {
  sendState: SubState;
  resetState: SubState;
}