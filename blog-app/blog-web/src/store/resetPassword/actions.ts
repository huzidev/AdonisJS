import { createAsyncThunk } from "@reduxjs/toolkit";
import * as endpoints from "./endpoints";


export const sendResetPasswordCode = createAsyncThunk(endpoints.SEND_CODE, async () => {
    
})