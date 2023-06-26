import { createSlice } from "@reduxjs/toolkit";
import { subState } from "store/states";
import * as actions from "./actions";
import { BlogState } from "./types";

const initialState: BlogState = {
    getBlogs: { ...subState, data: [] },
    getBlog: { ...subState, data: null },
    addBlog:  { ...subState },
    deleteBlog:  { ...subState },
    updateBlog:  { ...subState }
}

const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        // getAllBlogs
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
        // getBlogBySlug
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
        // addBlog
        builder.addCase(actions.addBlog.pending, (state) => {
            state.addBlog.loading = true;
            state.addBlog.error = false;
        })
        builder.addCase(actions.addBlog.fulfilled, (state) => {
            state.addBlog.loading = false;
            state.addBlog.error = false;
        })
        builder.addCase(actions.addBlog.rejected, (state) => {
            state.addBlog.loading = false;
            state.addBlog.error = true;
        })
        // deleteBlog
        builder.addCase(actions.deleteBlog.pending, (state) => {
            state.deleteBlog!.loading = true;
            state.deleteBlog!.error = false;
        })
        builder.addCase(actions.deleteBlog.fulfilled, (state) => {
            state.deleteBlog!.loading = false;
            state.deleteBlog!.error = false;
        })
        builder.addCase(actions.deleteBlog.rejected, (state) => {
            state.deleteBlog!.loading = false;
            state.deleteBlog!.error = true;
        })
        // updateBlog
        builder.addCase(actions.updateBlog.pending, (state) => {
            state.updateBlog!.loading = true;
            state.updateBlog!.error = false;
        })
        builder.addCase(actions.updateBlog.fulfilled, (state) => {
            state.updateBlog!.loading = false;
            state.updateBlog!.error = false;
        })
        builder.addCase(actions.updateBlog.rejected, (state) => {
            state.updateBlog!.loading = false;
            state.updateBlog!.error = true;
        })
    }
});

export default blogSlice.reducer;