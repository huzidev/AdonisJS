import { SubState } from "store/types";

export interface ResetPasswordSendCodeRequest {
  email: string; // only email is required for reset password code
}

export interface ResetPasswordOtp {
  code: string; 
}

export interface ResetPasswordRequest extends ResetPasswordSendCodeRequest, ResetPasswordOtp {
  password: string; // while resting password needs verification code, password, ConfirmPassword and email for email we've used extends ResetPasswordSendCodeRequest in which type for email is defined
  passwordConfirmation: string;
}

export interface SeneResetCodeState extends SubState {
  status?: number;
}

export interface ResetPasswordState {
  sendState: SeneResetCodeState;
  verifyState: SubState;
  resetState: SubState;
}