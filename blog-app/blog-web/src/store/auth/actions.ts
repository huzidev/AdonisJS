import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import * as endpoints from "./endpoints";
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
        console.log("Sign in resp", response);
    } catch (e) {
        console.log("Error", e);
    }
});

export const signOut = createAsyncThunk(endpoints.SIGN_OUT, async () => {
    try {
        await api.post(endpoints.SIGN_OUT);
    } catch (e) {
        console.log("Error", e);
    }
})