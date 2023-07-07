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
        console.log("response for reset password code");
        return response.data.data;
    } catch (e) {
        console.log("Error", e);
        
    }
})