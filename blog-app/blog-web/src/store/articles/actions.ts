import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import * as endpoints from "./endpoints";

const initialState = {
    blogs: []   
}

export const getBlog = createAsyncThunk(endpoints.GET_BLOG, async () => {
    try {
       const response = await api.get(endpoints.GET_BLOG);
       console.log("Response from redux", response);
    } catch (e) {
        console.log("Error", e);
    }
});

const getBlogSlice = createSlice({
    name: "image",
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder.addCase(getBlog.fulfilled, (state, action) => {
            state.blogs = action.payload;
        })
    }
})

export default getBlogSlice.reducer;

export const imageAction = getBlogSlice.actions;
