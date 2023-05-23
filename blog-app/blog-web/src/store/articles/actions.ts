import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import * as endpoints from "./endpoints";
import { BlogState, BlogUpdate } from "./types";

const initialState: BlogState = {
    allBlogs: []   
}

export const getBlogs = createAsyncThunk(endpoints.GET_BLOG, async () => {
    try {
       const response = await api.get(endpoints.GET_BLOG);
       return await response.data.data;
    } catch (e) {
        console.log("Error", e);
    }
});

export const updateBlog = createAsyncThunk(endpoints.UPDATE_BLOG, async (data: BlogUpdate) => {
    try {
        console.log("Receving data fir redux", data);
        const response = await api.put(endpoints.UPDATE_BLOG + data.id, data);
        alert("Blog updated");
        console.log("Update", response);
        
    } catch (e) {
        console.log("Error", e);
        
    }
})

export const deleteBlog = createAsyncThunk(endpoints.DELETE_BLOG, async (id: number) => {
    try {
        const response = await api.delete(endpoints.DELETE_BLOG + id);
    } catch (e) {
        console.log("Error", e);
    }
})

const getBlogSlice = createSlice({
    name: "blogs",
    initialState: initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder.addCase(getBlogs.fulfilled, (state, action) => {
            state.allBlogs = action.payload;
        })
    }
});

export default getBlogSlice.reducer;