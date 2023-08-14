import { createSlice } from "@reduxjs/toolkit";
import { subState } from "store/states";
import * as actions from "./actions";
import { CommentState } from "./types";

const initialState: CommentState = {
  addComment: { ...subState },
  deleteComment: { ...subState },
  getComments : { ...subState, data: null },
  getCommentById : { ...subState, data: null },
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
                if (state.getComments.data) {
                  const prevComments = JSON.parse(JSON.stringify(state.getComments.data));
                  state.getComments.data = [...prevComments, data]
                }
                state.addComment.message = message;
            }
        })
        builder.addCase(actions.addComment.rejected, (state) => {
          state.addComment = { loading: false, error: true };
        });
        // Get All Comments
        builder.addCase(actions.getComments.pending, (state) => {
          state.getComments = { loading: true, error: false };
        });
        builder.addCase(actions.getComments.fulfilled, (state, action) => {
          state.getComments = { loading: false, error: false };
            if (action.payload) {
              const { message, data } = action.payload; 
              state.getComments.comments = data.filter((comment: any) => comment.parentId === null);
              state.getComments.replies = data.filter((reply: any) => reply.parentId !== null);
              state.getComments.message = message;
            }
        })
        builder.addCase(actions.getComments.rejected, (state) => {
          state.getComments = { loading: false, error: true };
        });
        // Get Comment By Id
        builder.addCase(actions.getCommentById.pending, (state) => {
          state.getCommentById = { loading: true, error: false };
        });
        builder.addCase(actions.getCommentById.fulfilled, (state, action) => {
          state.getCommentById = { loading: false, error: false };
            if (action.payload) {
              const { message, data } = action.payload; 
              state.getCommentById.data = data;
              state.getCommentById.message = message;
            }
        })
        builder.addCase(actions.getCommentById.rejected, (state) => {
          state.getCommentById = { loading: false, error: true };
        });
        // Edit Comment
        builder.addCase(actions.editComment.pending, (state) => {
          state.editComment = { loading: true, error: false };
        });
        builder.addCase(actions.editComment.fulfilled, (state, action) => {
          state.editComment = { loading: false, error: false };
            if (action.payload) {
              const { message, data } = action.payload; 
              // state.editComment.data = data;
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
          state.getComments.data = JSON.parse(JSON.stringify(
            state.getComments.data?.filter(
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