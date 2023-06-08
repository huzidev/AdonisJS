import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import * as endpoints from "./endpoints";
import { AddBlogReq, BlogState, UpdateByIdReq } from "./types";

export const initialState: BlogState = {
    allBlogs: [],
    getBlog: {},
    loading: false,
    error: "",
    currPage: 1
}

export const getBlogs = createAsyncThunk(endpoints.GET_BLOGS, async () => {
    try {
       const response = await api.get(endpoints.GET_BLOGS);
       return await response.data.data;
    } catch (e) {
        console.log("Error", e);
    }
});

export const getBlog = createAsyncThunk(endpoints.GET_BLOG, async (slug: string) => {
    try {
        const response = await api.get(endpoints.GET_BLOG + slug);
        console.log("response", response.data.data);
        return await response.data.data;
    } catch (e) {
        console.log("Error", e);
    }
});

export const addBlog = createAsyncThunk(endpoints.ADD_BLOG, async (data: AddBlogReq) => {
    try {
        const response = await api.post(endpoints.ADD_BLOG, data);
        if (response) {
            alert("Blog added");
        }
        console.log("Add Blog", response);
    } catch (e) {
        console.log("Erro", e);
    }
});

export const updateBlog = createAsyncThunk(endpoints.UPDATE_BLOG, async (data: UpdateByIdReq) => {
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
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder.addCase(getBlogs.pending, (state) => {
            state.loading = true;
            state.error = "";
        })
        builder.addCase(getBlogs.fulfilled, (state, action) => {
            state.loading = false;
            state.allBlogs = [...action.payload];
            state.error = "";
        })
        builder.addCase(getBlog.rejected, (state) => {
            state.loading = false;
            state.error = "Error While loading data";
        })
        builder.addCase(getBlog.fulfilled, (state, action) => {
            state.getBlog = action.payload;
        })
    }
});

export default getBlogSlice.reducer;