import { createAsyncThunk } from "@reduxjs/toolkit";
import * as endpoints from "./endpoints";

export const updateById = createAsyncThunk(endpoints.UPDATE_BY_ID, async (data: AuthSignUpPayload) => {
    try {
        const response = await api.post(endpoints.UPDATE_BY_ID, data);
        console.log("Response", response);
    } catch (e) {
        console.log("Error", e);
    }
});