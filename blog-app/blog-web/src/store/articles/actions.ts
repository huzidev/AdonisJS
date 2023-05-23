import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import * as endpoints from "./endpoints";
import { BlogState } from "./types";

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

const getBlogSlice = createSlice({
    name: "blogs",
    initialState: initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder.addCase(getBlogs.fulfilled, (state, action) => {
            state.allBlogs = action.payload;
        })
    }
})

export default getBlogSlice.reducer;