import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { setToken } from "services/api";
import storage from "services/storage";
import { mapErrorToState } from "store/utils";
import { errorNotification } from "utils/notifications";
import * as endpoints from "./endpoints";
import KEYS from "./keys";
import { AuthSignInPayload, AuthSignUpPayload, User } from "./types";

export const signUp = createAsyncThunk(endpoints.SIGN_UP, async (data: AuthSignUpPayload): Promise<User | null>  => {
    try {
        const response = await api.post(endpoints.SIGN_UP, data);
         if (response.data) {
            setToken(response.data.token);
            await storage.setItem(KEYS.TOKEN, response.data.token);
        }
        localStorage.getItem(KEYS.TOKEN);
        console.log("Sign Up resp", response.data);
        return response.data;
    } catch (e: any) {
        console.log("Error", e);
        const err = mapErrorToState(e);
        errorNotification(err);
        throw e
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
        console.log("Sign in resp", response.data);
        return response.data;
    } catch (e: any) {
        const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
    }
});

export const signOut = createAsyncThunk(endpoints.SIGN_OUT, async () => {
    try {
        const response = await api.post(endpoints.SIGN_OUT);
        storage.removeItem(KEYS.TOKEN);
        setToken(null);
        console.log("signout resp", response);
        return response.data.message;
    } catch (e: any) {
        const err = mapErrorToState(e);
        console.log("Error", err);
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