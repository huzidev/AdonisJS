import { SubState } from "store/types";

export interface AuthVerificationCode extends SubState {
    code: string;
}

export interface AuthVerificationPayload {
    code: string;
}

export interface EmailVerificationState {
  sendCode: AuthVerificationCode;
    verifyCode: SubState;
}