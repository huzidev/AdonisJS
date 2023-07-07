import { createSlice } from "@reduxjs/toolkit";
import { subState } from "store/states";
import { ResetPasswordState } from "./types";

const initialState: ResetPasswordState = {
    sendState: { ...subState }
}

export const resetSlice = createSlice({
    name: "reset",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        
    }
})

export default authSlice.reducer;