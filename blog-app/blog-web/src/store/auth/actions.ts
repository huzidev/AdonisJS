import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api, { setToken } from "../../services/api";
import storage from "../../services/storage";
import * as endpoints from "./endpoints";
import KEYS from "./keys";
import { UserDetail, UserDetailState, UserSignInState, UserState } from "./types";

const initialState: UserDetailState = {
    loading: false,
    error: false,
    getUser: {}
}

export const signUp = createAsyncThunk(endpoints.SIGN_UP, async (data: UserState) => {
    try {
        const response = await api.post(endpoints.SIGN_UP, data);
        console.log("Response", response);
    } catch (e) {
        console.log("Error", e);
    }
});

export const signIn = createAsyncThunk(endpoints.SIGN_IN, async (data: UserSignInState) => {
    try {
        const response = await api.post(endpoints.SIGN_IN, data);
        if (response.data) {
            console.log("signin token", typeof(response.data.token));
            setToken(response.data.token);
            await storage.setItem(KEYS.TOKEN, response.data.token);
        }
        const dataSave = localStorage.getItem(KEYS.TOKEN);
        console.log("local storage", dataSave);
        console.log("Sign in resp", response);
    } catch (e) {
        console.log("Error", e);
    }
});

export const signOut = createAsyncThunk(endpoints.SIGN_OUT, async () => {
    try {
        const response = await api.post(endpoints.SIGN_OUT);
        storage.removeItem(KEYS.TOKEN);
        setToken(null);
        console.log("signout resp", response);
    } catch (e) {
        console.log("Error", e);
    }
})

export const initUser = createAsyncThunk(endpoints.USER_DETAILS, async () => {
    try {
        const token = await storage.getItem<string>(KEYS.TOKEN);
        if (token) {
            setToken(token)
            const response = await api.get(endpoints.USER_DETAILS);
            console.log("response for user details", response);
            return await response.data.data;
        }
    } catch (e) {
        await storage.removeItem(KEYS.TOKEN);
        setToken(null);
        console.log("Error", e);
    }
})

const getUserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(initUser.pending, (state) => {
            state.loading = true;
            state.error = false
        })
        builder.addCase(initUser.fulfilled, (state, action: PayloadAction<UserDetail>) => {
            state.loading = false;
            state.getUser = {...state.getUser, ...action.payload}
            state.error = false
        })
        builder.addCase(initUser.rejected, (state) => {
            state.loading = false
            state.error = true
        })
    }
})

export default getUserSlice.reducer;