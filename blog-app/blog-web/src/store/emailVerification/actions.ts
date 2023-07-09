import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "services/api";
import * as endpoints from "./endpoints";
import { EmailVerificationPayload } from "./types";

export const sendVerificationCode = createAsyncThunk(endpoints.SEND_CODE, async () => {
    try {
        const response = await api.post(endpoints.SEND_CODE);
        return response.data.data
    } catch (e) {
        console.log("Error", e);
    }
})

export const verifyVerificationCode = createAsyncThunk(endpoints.VERIFY_CODE, async (code: EmailVerificationPayload) => {
    try {
        console.log("Verification code from user is", code);
        const response = await api.post(endpoints.VERIFY_CODE, code);
        console.log("Verification Code", response);
    } catch (e) {
        console.log("Error", e);
    }
})