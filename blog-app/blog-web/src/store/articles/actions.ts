import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import * as endpoints from "./endpoints";
import { AddBlogState, BlogState, BlogUpdate } from "./types";

const initialState: BlogState = {
    allBlogs: [],
    getBlog: {}
}

export const getBlogs = createAsyncThunk(endpoints.GET_BLOGS, async () => {
    try {
       const response = await api.get(endpoints.GET_BLOGS);
       return await response.data.data;
    } catch (e) {
        console.log("Error", e);
    }
});

export const getBlog = createAsyncThunk(endpoints.GET_BLOG, async (id: number) => {
    try {
        const response = await api.get(endpoints.GET_BLOG + id);
        return await response.data.data;
    } catch (e) {
        console.log("Error", e);
    }
});

export const addBlog = createAsyncThunk(endpoints.ADD_BLOG, async (data: AddBlogState) => {
    try {
        const response = await api.post(endpoints.ADD_BLOG, data);
        console.log("Add Blog", response);
    } catch (e) {
        console.log("Erro", e);
    }
});

export const updateBlog = createAsyncThunk(endpoints.UPDATE_BLOG, async (data: BlogUpdate) => {
    try {
        const response = await api.put(endpoints.UPDATE_BLOG + data.id, data);
        alert("Blog updated");
        console.log("Update", response);
    } catch (e) {
        console.log("Error", e);
        
    }
});

export const deleteBlog = createAsyncThunk(endpoints.DELETE_BLOG, async (id: number) => {
    try {
        await api.delete(endpoints.DELETE_BLOG + id);
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
            state.allBlogs = action.payload;
        })
        builder.addCase(getBlog.fulfilled, (state, action) => {
            state.getBlog = action.payload;
        })
    }
});

export default getBlogSlice.reducer;