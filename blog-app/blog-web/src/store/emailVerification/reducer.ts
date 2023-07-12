import { createSlice } from "@reduxjs/toolkit";
import { subState } from "store/states";
import * as actions from "./actions";
import { EmailVerificationState } from "./types";

const initialState: EmailVerificationState = {
    sendCode:  { ...subState, code: '' },
    verifyCode:  { ...subState }
}

export const emailVerificationSlice = createSlice({
    name: "emailVerification",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // sendVerificationCode
        builder.addCase(actions.sendVerificationCode.pending, (state) => {
            state.sendCode.loading = true;
            state.sendCode.error = false
        });
        builder.addCase(actions.sendVerificationCode.fulfilled, (state, action: any) => {
            state.sendCode.loading = false;
            if (action.payload) {
                console.log("action payload for code", action.payload);
                state.sendCode.code = action.payload
            }
            state.sendCode.error = false
        });
        builder.addCase(actions.sendVerificationCode.rejected, (state) => {
            state.sendCode.loading = false
            state.sendCode.error = true
        });
        // verifyVerificationCode
        builder.addCase(actions.verifyVerificationCode.pending, (state) => {
            state.verifyCode = {loading: true, error: false};
        });
        builder.addCase(actions.verifyVerificationCode.fulfilled, (state) => {
            state.verifyCode = {loading: false, error: false};
        });
        builder.addCase(actions.verifyVerificationCode.rejected, (state) => {
            state.verifyCode = {loading: false, error: true};
        });
    }
})

export default emailVerificationSlice.reducer;