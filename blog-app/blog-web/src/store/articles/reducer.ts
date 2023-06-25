import { createSlice } from "@reduxjs/toolkit";
import { subState } from "store/states";
import * as actions from "./actions";
import { BlogState } from "./types";

const initialState: BlogState = {
    getBlogs: { ...subState, data: [] },
    getBlog: { ...subState, data: null }
}

const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder.addCase(actions.getBlogs.pending, (state) => {
            state.getBlogs!.loading = true;
            state.getBlogs!.error = false;
        })
        builder.addCase(actions.getBlogs.fulfilled, (state, action) => {
            state.getBlogs!.loading = false;
            if (action.payload) {
                state.getBlogs!.data = [...action.payload];
            }
            state.getBlogs!.error = false;
        })
        builder.addCase(actions.getBlogs.rejected, (state) => {
            state.getBlogs!.loading = false;
            state.getBlogs!.error = true;
        })
         builder.addCase(actions.getBlog.pending, (state) => {
            state.getBlog!.loading = true;
            state.getBlog!.error = false;
        })
        builder.addCase(actions.getBlog.fulfilled, (state, action) => {
            state.getBlog!.loading = false;
            if (action.payload) {
                state.getBlog!.data = {...action.payload};
            }
            state.getBlog!.error = false;
        })
        builder.addCase(actions.getBlog.rejected, (state) => {
            state.getBlog!.loading = false;
            state.getBlog!.error = true;
        })
    }
});

export default blogSlice.reducer;