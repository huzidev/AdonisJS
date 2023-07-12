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
            // only newVerification message will be shown the other message wait a minute before sending code again will shown through action
            if (action.payload) {
                state.sendCode.message = action.payload;
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
        builder.addCase(actions.verifyVerificationCode.fulfilled, (state, action) => {
            state.verifyCode = {loading: false, error: false};
            if (action.payload) {
                state.verifyCode.message = action.payload.message;
            }
        });
        builder.addCase(actions.verifyVerificationCode.rejected, (state) => {
            state.verifyCode = {loading: false, error: true};
            console.log("RUN");
            
        });
    }
})

export default emailVerificationSlice.reducer;