import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "services/api";
import * as endpoints from "./endpoints";
import { ResetPasswordSendCodeRequest } from "./types";


export const sendResetPasswordCode = createAsyncThunk(endpoints.SEND_CODE, async (data: ResetPasswordSendCodeRequest) => {
    try {
        const response = await api.post(endpoints.SEND_CODE, data);
        if (response.status === 200) {
            alert("Code send successfully!")
        }
        console.log("response for reset password code", response);
        return response;
    } catch (e) {
        console.log("Error", e);
    }
})

export const resetPassword = createAsyncThunk(endpoints.RESET_PASSWORD, async (data) => {
    try {
        const response = await api.post(endpoints.RESET_PASSWORD, data);
        if (response.status === 200) {
            alert("Password Reset Successfully!")
        }
        return response;
    } catch (e) {
        console.log("Error", e);
        
    }
})