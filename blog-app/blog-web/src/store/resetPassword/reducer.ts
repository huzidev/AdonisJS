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
        builder.addCase(actions.sendResetPasswordCode.fulfilled, (state, action) => {
            state.sendState.loading = false
            if (action.payload?.status === 200) {
                state.sendState.status = action.payload?.status
            }
            state.sendState.error = false
        })
        builder.addCase(actions.sendResetPasswordCode.rejected, (state) => {
            state.sendState = {loading: false, error: true};
        })
    }
})

export default resetSlice.reducer;