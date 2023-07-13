import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "services/api";
import { mapErrorToState } from "store/utils";
import { errorNotification } from "utils/notifications";
import * as endpoints from "./endpoints";
import { ResetPasswordRequest, ResetPasswordSendCodeRequest } from "./types";


export const sendResetPasswordCode = createAsyncThunk(endpoints.SEND_CODE, async (data: ResetPasswordSendCodeRequest) => {
    try {
        const response = await api.post(endpoints.SEND_CODE, data);
        console.log("response for reset password code", response);
        return response.data.message;
    } catch (e: any) {
        const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
    }
})

export const resendResetPasswordCode = createAsyncThunk(endpoints.RESEND_CODE, async (data: ResetPasswordSendCodeRequest) => {
    try {
        const response = await api.post(endpoints.RESEND_CODE, data);
        console.log("response for reset password code", response);
        return response.data.message;
    } catch (e: any) {
        const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
    }
})

export const resetPassword = createAsyncThunk(endpoints.RESET_PASSWORD, async (data: ResetPasswordRequest) => {
    try {
        const response = await api.post(endpoints.RESET_PASSWORD, data);
        console.log("response", response);
        return response.data.message;
    } catch (e: any) {
        const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
    }
})