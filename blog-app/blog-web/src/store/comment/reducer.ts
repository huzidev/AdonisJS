import { createSlice } from "@reduxjs/toolkit";
import { subState } from "store/states";
import * as actions from "./actions";
import { CommentState } from "./types";

const initialState: CommentState = {
  addComment: { ...subState },
  getComments : { ...subState, data: null  }
};

export const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add Comment
        builder.addCase(actions.addComment.pending, (state) => {
          state.addComment = { loading: true, error: false };
        });
        builder.addCase(actions.addComment.fulfilled, (state, action) => {
            state.addComment = { loading: false, error: false };
            if (action.payload) {
                const { message } = action.payload;
                state.addComment.message = message;
            }
        })
        builder.addCase(actions.addComment.rejected, (state) => {
          state.addComment = { loading: false, error: true };
        });
        // Get All Comments
        builder.addCase(actions.getComments.pending, (state) => {
          state.addComment = { loading: true, error: false };
        });
        builder.addCase(actions.getComments.fulfilled, (state, action) => {
          state.addComment = { loading: true, error: false };
            if (action.payload) {
              const { message, data } = action.payload;
              state.getComments.data = data;
              state.addComment.message = message;
            }
        })
        builder.addCase(actions.getComments.rejected, (state) => {
          state.addComment = { loading: true, error: false };
        });
    }
})

export default commentSlice.reducer;