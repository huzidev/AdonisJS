import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "store/auth/types";
import { subState } from "store/states";
import * as actions from "./actions";
import { UserState } from "./types";

const initialState: UserState = {
    updateMe: { ...subState, data: null },
    updateById: { ...subState, data: null },
    allUser: { ...subState, data: null },
    getUser: { ...subState, data: null },
    getUserPage: { ...subState, data: [], meta: null },
    user: null
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
        builder.addCase(actions.updateMe.pending, (state) => {
            state.updateMe = {loading: true, error: false};
        })
        builder.addCase(actions.updateMe.fulfilled, (state, action) => {
            state.updateMe = {loading: false, error: false, data: action.payload};
        })
        builder.addCase(actions.updateMe.rejected, (state) => {
            state.updateMe = {loading: false, error: true};
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
        // getUserById
        builder.addCase(actions.getById.pending, (state) => {
            state.getUser = {loading: true, error: false};
        })
        builder.addCase(actions.getById.fulfilled, (state, action) => {
            state.getUser = {loading: false, error: false, data: action.payload};
        })
        builder.addCase(actions.getById.rejected, (state) => {
            state.getUser = {loading: false, error: true};
        })
        // updateUserById
        builder.addCase(actions.updateById.pending, (state) => {
            state.updateById = {loading: true, error: false};
        })
        builder.addCase(actions.updateById.fulfilled, (state, action) => {
            state.updateById = {loading: false, error: false, data: action.payload};
        })
        builder.addCase(actions.updateById.rejected, (state) => {
            state.updateById = {loading: false, error: true};
        })
    }
});

export default userSlice.reducer;