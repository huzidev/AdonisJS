import { createSlice } from "@reduxjs/toolkit";
import { subState } from "store/states";
import * as actions from "./actions";
import { CommentState } from "./types";

const initialState: CommentState = {
  addComment: { ...subState },
  deleteComment: { ...subState },
  getById : { ...subState, data: null },
  getAllComments : { ...subState, data: null },
  editComment : { ...subState, data: null }
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
                const { message, data } = action.payload;
                if (state.getById.data) {
                  const prevComments = JSON.parse(JSON.stringify(state.getById.data));
                  state.getById.data = [...prevComments, data];
                }
                state.addComment.message = message;
            }
        })
        builder.addCase(actions.addComment.rejected, (state) => {
          state.addComment = { loading: false, error: true };
        });
        // Get Comments By Id
        builder.addCase(actions.getById.pending, (state) => {
          state.getById = { loading: true, error: false };
        });
        builder.addCase(actions.getById.fulfilled, (state, action) => {
          state.getById = { loading: false, error: false };
            if (action.payload) {
              const { message, data } = action.payload; 
              state.getById.data = data;
              state.getById.message = message;
            }
        })
        builder.addCase(actions.getById.rejected, (state) => {
          state.getById = { loading: false, error: true };
        });
        // Get All Comments
        builder.addCase(actions.getAllComments.pending, (state) => {
          state.getAllComments = { loading: true, error: false };
        });
        builder.addCase(actions.getAllComments.fulfilled, (state, action) => {
          state.getAllComments = { loading: false, error: false };
            if (action.payload) {
              const { message, data } = action.payload; 
              state.getAllComments.data = data;
              state.getAllComments.message = message;
            }
        })
        builder.addCase(actions.getAllComments.rejected, (state) => {
          state.getAllComments = { loading: false, error: true };
        });
        // Edit Comment
        builder.addCase(actions.editComment.pending, (state) => {
          state.editComment = { loading: true, error: false };
        });
        builder.addCase(actions.editComment.fulfilled, (state, action) => {
          state.editComment = { loading: false, error: false };
            if (action.payload) {
              const { message, data } = action.payload;
              // fetch all comments except the one which has to be edit
              const prevComments = JSON.parse(JSON.stringify(state.getById.data?.filter((val) => val.id !== data.id)));
              // append prevComments except the one which has been updated and concat the updated comment with the previous comments
              state.getById.data = [...prevComments, data]
              state.editComment.message = message;
            }
        })
        builder.addCase(actions.editComment.rejected, (state) => {
          state.editComment = { loading: false, error: true };
        });
        // Delete Comment
        builder.addCase(actions.deleteComment.pending, (state) => {
          state.deleteComment = { loading: true, error: false };
        });
        builder.addCase(actions.deleteComment.fulfilled, (state, action) => {
          state.deleteComment = { loading: false, error: false };
          if (action.payload) {
          const { response, message } = action.payload;
          state.getById.data = JSON.parse(JSON.stringify(
            state.getById.data?.filter(
              (comment) => comment.id !== response.id
            ))) 
            state.deleteComment.message = message;
          }
        })
        builder.addCase(actions.deleteComment.rejected, (state) => {
          state.deleteComment = { loading: false, error: true };
        });
    }
})

export default commentSlice.reducer;