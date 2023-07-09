import { subState } from "store/states";
import { EmailVerificationState } from "./types";

const initialState: EmailVerificationState = {
sendCode:  { ...subState, code: "" },
verifyCode:  { ...subState },
}