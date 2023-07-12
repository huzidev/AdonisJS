import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "services/api";
import { mapErrorToState } from "store/utils";
import { errorNotification } from "utils/notifications";
import * as endpoints from "./endpoints";
import { EmailVerificationPayload } from "./types";

export const sendVerificationCode = createAsyncThunk(endpoints.SEND_CODE, async () => {
    try {
        const response = await api.post(endpoints.SEND_CODE);
        console.log("response for send code", response.data.message);
        
        return response.data.message
    } catch (e) {
        console.log("Error", e);
    }
})

export const verifyVerificationCode = createAsyncThunk(endpoints.VERIFY_CODE, async (code: EmailVerificationPayload) => {
    try {
        const response = await api.post(endpoints.VERIFY_CODE, code);
        console.log("Verification Code RESPONSE", response);
        return response.data;
    } catch (e: any) {
        const err = mapErrorToState(e);
        console.log("Error", e);
        errorNotification("Error", err);
    }
})