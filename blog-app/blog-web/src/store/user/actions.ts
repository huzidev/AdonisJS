import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "services/api";
import * as endpoints from "./endpoints";
import { UserUpdatePayload } from "./types";

export const updateById = createAsyncThunk(endpoints.UPDATE_ME, async (data: UserUpdatePayload) => {
    try {
        const response = await api.put(endpoints.UPDATE_ME, data);
        if (response.status === 200) {
            alert("User updated");
        }
        console.log("Update", response);
        return response.data.data;
    } catch (e) {
        console.log("Error", e);
    }
});