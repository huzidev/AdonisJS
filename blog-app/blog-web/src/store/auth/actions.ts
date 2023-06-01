import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { setToken } from "../../services/api";
import storage from "../../services/storage";
import * as endpoints from "./endpoints";
import KEYS from "./keys";
import { UserSignInState, UserState } from "./types";

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
        
    } catch (e) {
        console.log("Error", e);
        
    }
})