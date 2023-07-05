import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "services/api";
import { User } from "store/auth/types";
import * as endpoints from "./endpoints";
import { UpdateByIdPayload, UpdateMePayload } from "./types";

export const updateMe = createAsyncThunk(endpoints.UPDATE_ME, async (data: UpdateMePayload): Promise<User | null> => {
    try {
        const response = await api.put(endpoints.UPDATE_ME, data);
        if (response.status === 200) {
            alert("Details Updated")
        }
        return response.data.data;
    } catch (e) {
        console.log("Error", e);
        return null;
    }
});

export const updateById = createAsyncThunk(endpoints.UPDATE_USER, async (data: UpdateByIdPayload): Promise<User | null> => {
    try {
        const response = await api.put(endpoints.UPDATE_USER + data.id, data);
        if (response.status === 200) {
            alert("Details Updated")
        }
        return response.data.data;
    } catch (e) {
        console.log("Error", e);
        return null;
    }
});

export const allUser = createAsyncThunk(endpoints.USER_LIST, async () => {
    try {
        const response = await api.get(endpoints.USER_LIST);
        return response.data.data;
    } catch (e) {
        console.log("Error", e);
    }
})

export const allUserByPage = createAsyncThunk(endpoints.USER_LIST_PAGE, async (page: number) => {
    try {
        const response = await api.get(endpoints.USER_LIST_PAGE + page);
        return response.data.data.data;
    } catch (e) {
        console.log("Error", e);
    }
})

export const getById = createAsyncThunk(endpoints.GET_BY_ID, async (id: number) => {
    try {
        const response = await api.get(endpoints.GET_BY_ID + id);
        return response.data.data;
    } catch (e) {
        console.log("Error", e);
        
    }
})