import { SubState } from "store/types";

export interface ResetPasswordSendCodeRequest {
  email: string; // only email is required for reset password code
}

export interface SeneResetCodeState extends SubState {
  status?: number;
}

export interface ResetPasswordState {
  sendState: SeneResetCodeState;
  resetState: SubState;
}