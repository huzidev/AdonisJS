import { createSlice } from "@reduxjs/toolkit";
import { subState } from "store/states";
import * as actions from "./actions";
import { ResetPasswordState } from "./types";

const initialState: ResetPasswordState = {
    sendState: { ...subState },
    resetState: { ...subState }
}

export const resetSlice = createSlice({
    name: "reset",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actions.sendResetPasswordCode.pending, (state) => {
            state.sendState = {loading: true, error: false};
        })
        builder.addCase(actions.sendResetPasswordCode.fulfilled, (state) => {
            state.sendState = {loading: false, error: false};
        })
        builder.addCase(actions.sendResetPasswordCode.rejected, (state) => {
            state.sendState = {loading: false, error: true};
        })
    }
})

export default resetSlice.reducer;