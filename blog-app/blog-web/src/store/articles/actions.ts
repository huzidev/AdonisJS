import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import * as endpoints from "./endpoints";
import { BlogState } from "./types";

const initialState: BlogState = {
    blogs: []   
}

export const getBlogs = createAsyncThunk(endpoints.GET_BLOG, async () => {
    try {
       const response = await api.get(endpoints.GET_BLOG);
       console.log("Response from redux", response.data);
       return response.data;
    } catch (e) {
        console.log("Error", e);
    }
});

const getBlogSlice = createSlice({
    name: "blogs",
    initialState: initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder.addCase(getBlogs.fulfilled, (state, action) => {
            state.blogs = action.payload;
        })
    }
})

export const imageAction = getBlogSlice.actions;