import { SubState } from "store/types";

export interface AuthVerificationCode extends SubState {
    code: string;
}

export interface AuthVerificationPayload {
    code: string;
}