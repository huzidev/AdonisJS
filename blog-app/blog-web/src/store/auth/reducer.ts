import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { subState } from "store/states";
import { userSlice } from "store/user/reducer";
import * as actions from "./actions";
import { AuthState, User } from "./types";

const initialState: AuthState = {
    signInState:  { ...subState },
    signUpState:  { ...subState },
    signOutState:  { ...subState },
    initState:  { ...subState, init: false },
    user: null,
    isDark: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        theme: (state) => {
            state.isDark = !state.isDark
        }
    },
    extraReducers: (builder) => {
        // initUser
        builder.addCase(actions.initUser.pending, (state) => {
            state.initState.loading = true;
            state.initState.error = false
        });
        builder.addCase(actions.initUser.fulfilled, (state, action: PayloadAction<User | null>) => {
            state.initState.init = true
            state.initState.loading = false;
            if (action.payload) {
                state.user = {...action.payload};
            }
            state.initState.error = false
        });
        builder.addCase(actions.initUser.rejected, (state) => {
            state.initState.loading = false
            state.initState.error = true
        });
        // signUp User
        builder.addCase(actions.signUp.pending, (state) => {
            state.signUpState = { loading: true, error: false }
        });
        builder.addCase(actions.signUp.fulfilled, (state, action: PayloadAction<User | null>) => {
            state.signUpState.loading = false;
            if (action.payload) {
                const { data, message }: any = action.payload;
                state.user = {...data};
                state.signUpState.message = message;
            }
            state.signUpState.error = false
        });
        builder.addCase(actions.signUp.rejected, (state) => {
            state.signUpState = { loading: false, error: true }
        });
        // signInUser
        builder.addCase(actions.signIn.pending, (state) => {
            state.signInState = { loading: true, error: false }
        });
        builder.addCase(actions.signIn.fulfilled, (state, action: PayloadAction<User | null>) => {
            state.signInState.loading = false;
            if (action.payload) {
                const { data, message }: any = action.payload;
                console.log("SIGN IN PAYLOAD", action.payload);
                state.user = {...data};
                state.signInState.message = message;
            }
            state.signInState.error = false
        });
        builder.addCase(actions.signIn.rejected, (state, action) => {
            state.signInState.loading = false;
            state.signInState.error = true;
        });
        // signOutUser
        builder.addCase(actions.signOut.pending, (state) => {
            state.signOutState.loading = true;
            state.signOutState.error = false
        });
        builder.addCase(actions.signOut.fulfilled, (state, action) => {
            state.signOutState.loading = false;
            state.user = null;
            state.signOutState.error = false
        });
        builder.addCase(actions.signOut.rejected, (state) => {
            state.signOutState.loading = false
            state.signOutState.error = true
        });
        // when userUpdate the data then updated details will saved in state.user
        builder.addCase(userSlice.actions.updateUser, (state, action: PayloadAction<User>) => {
            state.user = { ...state.user, ...action.payload };
        });
        
    }
})

export default authSlice.reducer;