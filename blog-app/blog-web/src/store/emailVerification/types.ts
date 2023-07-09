import { SubState } from "store/types";

export interface EmailVerificationCode extends SubState {
  code: string;
}

export interface EmailVerificationPayload {
  code: string;
}

export interface EmailVerificationState {
  sendCode: EmailVerificationCode;
  verifyCode: SubState;
}
