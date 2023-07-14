import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "services/api";
import { User } from "store/auth/types";
import { mapErrorToState } from "store/utils";
import { errorNotification } from "utils/notifications";
import * as endpoints from "./endpoints";
import { UpdateByIdPayload, UpdateMePayload } from "./types";

export const updateMe = createAsyncThunk(endpoints.UPDATE_ME, async (data: UpdateMePayload): Promise<User | null> => {
    try {
        const response = await api.put(endpoints.UPDATE_ME, data);
        console.log("Response for updateMe", updateMe);
        return response.data;
    } catch (e: any) {
        const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
    }
});

export const updateById = createAsyncThunk(endpoints.UPDATE_USER, async (data: UpdateByIdPayload): Promise<User | null> => {
    try {
        const response = await api.put(endpoints.UPDATE_USER + data.id, data);
        console.log("Response for upate by id", response);
        return response.data;
    } catch (e: any) {
        const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
    }
});

export const createUser = createAsyncThunk(endpoints.CREATE_USER, async (data: User) => {
    try {
        const response = await api.post(endpoints.CREATE_USER, data);
        console.log("Response for Craete User", updateById);
        return response.data.message;
    } catch (e: any) {
        const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
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
        return response.data.data;
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