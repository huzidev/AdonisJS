import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { setToken } from "services/api";
import storage from "services/storage";
import * as endpoints from "./endpoints";
import KEYS from "./keys";
import { AuthSignInPayload, AuthSignUpPayload, User } from "./types";

export const signUp = createAsyncThunk(endpoints.SIGN_UP, async (data: AuthSignUpPayload) => {
    try {
        const response = await api.post(endpoints.SIGN_UP, data);
        console.log("Response", response);
    } catch (e) {
        console.log("Error", e);
    }
});

export const signIn = createAsyncThunk(endpoints.SIGN_IN, async (data: AuthSignInPayload): Promise<User | null> => {
    try {
        const response = await api.post(endpoints.SIGN_IN, data);
        if (response.data) {
            setToken(response.data.token);
            await storage.setItem(KEYS.TOKEN, response.data.token);
        }
        localStorage.getItem(KEYS.TOKEN);
        console.log("Sign in resp", response);
        return response.data;
    } catch (e) {
        console.log("Error", e);
        throw e;
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

export const initUser = createAsyncThunk(endpoints.USER_DETAILS, async (): Promise<User | null> => {
    try {
        const token = await storage.getItem<string>(KEYS.TOKEN);
        if (token) {
            setToken(token)
            const response = await api.get(endpoints.USER_DETAILS);
            console.log("response for user details", response);
            return response.data.data;
        }
        return null;
    } catch (e) {
        await storage.removeItem(KEYS.TOKEN);
        setToken(null);
        console.log("Error", e);
        throw e;
    }
})