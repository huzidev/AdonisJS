import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "store/auth/types";
import { subState } from "store/states";
import * as actions from "./actions";
import { UserState } from "./types";

const initialState: UserState = {
    updateUser: { ...subState, data: null },
    user: null,
    allUser: { ...subState, data: null },
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action:PayloadAction<User>) => {
            state.user = {
                ...(state?.user ?? {}),
                ...action.payload
            };
        }
    },
    extraReducers: (builder) => {
        // updateUser
        builder.addCase(actions.updateById.pending, (state) => {
            state.updateUser = {loading: true, error: false};
        })
        builder.addCase(actions.updateById.fulfilled, (state, action) => {
            state.updateUser = {loading: false, error: false, data: action.payload};
        })
        builder.addCase(actions.updateById.rejected, (state) => {
            state.updateUser = {loading: false, error: true};
        })
        // getAllUser
        builder.addCase(actions.allUser.pending, (state) => {
            state.allUser = {loading: true, error: false};
        })
        builder.addCase(actions.allUser.fulfilled, (state, action) => {
            state.allUser = {loading: false, error: false, data: action.payload};
        })
        // ASKED if to add data: action.payload in error field?
        builder.addCase(actions.allUser.rejected, (state) => {
            state.allUser = {loading: false, error: true};
        })
    }
});

export default userSlice.reducer;