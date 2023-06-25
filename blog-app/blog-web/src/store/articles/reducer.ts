import { createSlice } from "@reduxjs/toolkit";
import { subState } from "store/states";
import * as actions from "./actions";
import { BlogState } from "./types";

const initialState: BlogState = {
    getBlogs: { ...subState, data: [] },
    getBlog: { ...subState }
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
                console.log("runs");
                
            }
            state.getBlogs!.error = false;
        })
        builder.addCase(actions.getBlogs.rejected, (state) => {
            state.getBlogs!.loading = false;
            state.getBlogs!.error = true;
        })
    }
});

export default blogSlice.reducer;