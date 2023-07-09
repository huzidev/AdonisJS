import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { subState } from "store/states";
import { userSlice } from "store/user/reducer";
import * as actions from "./actions";
import { AuthState, User } from "./types";

const initialState: AuthState = {
    signInState:  { ...subState },
    signUpState:  { ...subState },
    init:  { ...subState, init: false },
    user: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actions.initUser.pending, (state) => {
            state.init.loading = true;
            state.init.error = false
        });
        builder.addCase(actions.initUser.fulfilled, (state, action: PayloadAction<User | null>) => {
            state.init.init = true
            state.init.loading = false;
            if (action.payload) {
                state.user = {...action.payload};
            }
            state.init.error = false
        });
        builder.addCase(actions.initUser.rejected, (state) => {
            state.init.loading = false
            state.init.error = true
        });
        builder.addCase(actions.signUp.pending, (state) => {
            state.init.loading = true;
            state.init.error = false
        });
        builder.addCase(actions.signUp.fulfilled, (state) => {
            state.init.loading = false;
            state.init.error = false
        });
        builder.addCase(actions.signUp.rejected, (state) => {
            state.init.loading = false
            state.init.error = true
        });
        builder.addCase(actions.signIn.pending, (state) => {
            state.init.loading = true;
            state.init.error = false
        });
        builder.addCase(actions.signIn.fulfilled, (state, action: PayloadAction<User| null>) => {
            state.init.loading = false;
            if (action.payload) {
                state.user = {...action.payload};
            }
            state.init.error = false
        });
        builder.addCase(actions.signIn.rejected, (state) => {
            state.init.loading = false
            state.init.error = true
        });
        builder.addCase(actions.signOut.pending, (state) => {
            state.init.loading = true;
            state.init.error = false
        });
        builder.addCase(actions.signOut.fulfilled, (state) => {
            state.init.loading = false;
            state.user = null;
            state.init.error = false
        });
        builder.addCase(actions.signOut.rejected, (state) => {
            state.init.loading = false
            state.init.error = true
        });
        // when userUpdate the data then updated details will saved in state.user
        builder.addCase(userSlice.actions.updateUser, (state, action: PayloadAction<User>) => {
            state.user = { ...state.user, ...action.payload };
        });
        
    }
})

export default authSlice.reducer;