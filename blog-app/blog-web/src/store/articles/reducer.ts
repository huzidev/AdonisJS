import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./actions";


const getBlogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder.addCase(actions.getBlogs.pending, (state) => {
            state.loading = true;
            state.error = "";
        })
        builder.addCase(actions.getBlogs.fulfilled, (state, action) => {
            state.loading = false;
            state.allBlogs = [...action.payload];
            state.error = "";
        })
        builder.addCase(actions.getBlog.rejected, (state) => {
            state.loading = false;
            state.error = "Error While loading data";
        })
        builder.addCase(actions.getBlog.fulfilled, (state, action) => {
            state.getBlog = action.payload;
        })
    }
});

export const stateActions = getBlogSlice.actions
export default getBlogSlice.reducer;