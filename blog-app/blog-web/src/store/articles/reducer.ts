import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { Blog, BlogList } from "./types";

const initialState: BlogList = {
    loading: false,
    error: false
}

const getBlogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder.addCase(actions.getBlogs.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(actions.getBlogs.fulfilled, (state, action: PayloadAction<Blog | null>) => {
            state.loading = false;
            if (action.payload) {
                state.data = [...action.payload];
            }
            state.error = false;
        })
        builder.addCase(actions.getBlog.rejected, (state) => {
            state.loading = false;
            state.error = true;
        })
        builder.addCase(actions.getBlog.fulfilled, (state, action) => {
            state.getBlog = action.payload;
        })
    }
});

export const stateActions = getBlogSlice.actions
export default getBlogSlice.reducer;