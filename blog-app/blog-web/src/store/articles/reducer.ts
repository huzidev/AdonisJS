import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { subState } from "store/states";
import * as actions from "./actions";
import { BlogDetail, BlogState } from "./types";

const initialState: BlogState = {
    blogsListState: { ...subState, data: [] }
}

const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder.addCase(actions.getBlogs.pending, (state) => {
            state.blogsListState.loading = true;
            state.blogsListState.error = false;
        })
        builder.addCase(actions.getBlogs.fulfilled, (state, action: PayloadAction<BlogDetail[] | null>) => {
            state.blogsListState.loading = false;
            if (action.payload) {
                state.blogsListState.data = [...action.payload];
            }
            state.blogsListState.error = false;
        })
        builder.addCase(actions.getBlogs.rejected, (state) => {
            state.blogsListState.loading = false;
            state.blogsListState.error = true;
        })
    }
});

export default blogSlice.reducer;