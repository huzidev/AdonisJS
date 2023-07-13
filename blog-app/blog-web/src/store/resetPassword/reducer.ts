import { createSlice } from "@reduxjs/toolkit";
import { subState } from "store/states";
import * as actions from "./actions";
import { ResetPasswordState } from "./types";

const initialState: ResetPasswordState = {
    sendState: { ...subState },
    resendState: { ...subState },
    resetState: { ...subState }
}

export const resetSlice = createSlice({
    name: "reset",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // sendResetPasswordCode
        builder.addCase(actions.sendResetPasswordCode.pending, (state) => {
            state.sendState = {loading: true, error: false};
        })
        builder.addCase(actions.sendResetPasswordCode.fulfilled, (state, action) => {
            state.sendState.loading = false
            if (action.payload) {
                state.sendState.message = action.payload
            }
            state.sendState.error = false
        })
        builder.addCase(actions.sendResetPasswordCode.rejected, (state) => {
            state.sendState = {loading: false, error: true};
        })
        // resendResetPasswordCode
        builder.addCase(actions.resendResetPasswordCode.pending, (state) => {
            state.resendState = {loading: true, error: false};
        })
        builder.addCase(actions.resendResetPasswordCode.fulfilled, (state, action) => {
            state.resendState.loading = false
            if (action.payload) {
                state.resendState.message = action.payload
            }
            state.resendState.error = false
        })
        builder.addCase(actions.resendResetPasswordCode.rejected, (state) => {
            state.resendState = {loading: false, error: true};
        })
        // resetPassword
        builder.addCase(actions.resetPassword.pending, (state) => {
            state.resetState = {loading: true, error: false};
        })
        builder.addCase(actions.resetPassword.fulfilled, (state) => {
            state.resetState = {loading: false, error: false};
        })
        builder.addCase(actions.resetPassword.rejected, (state) => {
            state.resetState = {loading: false, error: true};
        })
    }
})

export default resetSlice.reducer;