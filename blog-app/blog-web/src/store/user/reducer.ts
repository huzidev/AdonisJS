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
    getUserPage: { 
        ...subState, 
        data: null, 
        meta: null, 
        filters: null 
    },
    createUser: { ...subState },
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
            state.updateMe = {loading: false, error: false};
            if (action.payload) {
                const { data, message }: any = action.payload;
                state.updateMe.data = {...data};
                state.updateMe.message = message;
            }
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
        builder.addCase(actions.allUser.rejected, (state) => {
            state.allUser = {loading: false, error: true};
        })
        // getUserByPage
        builder.addCase(actions.allUserByPage.pending, (state) => {
            state.getUserPage.loading = true;
            state.getUserPage.error = false;
        })
        builder.addCase(actions.allUserByPage.fulfilled, (state, action) => {
            state.getUserPage.loading = false;
            if (action.payload) {
                const { data, message } = action.payload;
                state.getUserPage.data = data.data;
                state.getUserPage.meta = data.meta;
                state.getUserPage.message = message;
            }
            state.getUserPage.error = false;
        })
        // ASKED if to add data: action.payload in error field?
        builder.addCase(actions.allUserByPage.rejected, (state) => {
            state.getUserPage.loading = false;
            state.getUserPage.error = true;
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
            state.updateById = {loading: false, error: false};
            if (action.payload) {
                const { data, message }: any = action.payload;
                state.updateById.data = {...data};
                state.updateById.message = message;
            }
        })
        builder.addCase(actions.updateById.rejected, (state) => {
            state.updateById = {loading: false, error: true};
        })
        // createUserByAdmin
        builder.addCase(actions.createUser.pending, (state) => {
            state.createUser = {loading: true, error: false};
        })
        builder.addCase(actions.createUser.fulfilled, (state, action) => {
            state.createUser = {loading: false, error: false};
            if (action.payload) {
                state.createUser.message = action.payload;
            }
        })
        builder.addCase(actions.createUser.rejected, (state) => {
            state.createUser = {loading: false, error: true};
        })
    }
});

export default userSlice.reducer;