import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "services/api";
import { User } from "store/auth/types";
import * as endpoints from "./endpoints";
import { UserUpdatePayload } from "./types";

export const updateById = createAsyncThunk(endpoints.UPDATE_ME, async (data: UserUpdatePayload): Promise<User | null> => {
    try {
        const response = await api.put(endpoints.UPDATE_ME, data);
        if (response.status === 200) {
        }
        return response.data.data;
    } catch (e) {
        console.log("Error", e);

        return null;
    }
});