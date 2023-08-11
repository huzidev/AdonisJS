import { createSlice } from "@reduxjs/toolkit";
import { subState } from "store/states";
import * as actions from "./actions";
import { ReplyState } from "./types";

const initialState: ReplyState = {
  addReply: { ...subState },
  deleteReply: { ...subState },
  getReplies : { ...subState, data: null },
  getReplyById : { ...subState, data: null },
  editReply : { ...subState, data: null }
};

export const replySlice = createSlice({
    name: "replies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add Comment
        builder.addCase(actions.addReply.pending, (state) => {
          state.addReply = { loading: true, error: false };
        });
        builder.addCase(actions.addReply.fulfilled, (state, action) => {
            state.addReply = { loading: false, error: false };
            if (action.payload) {
                const { message, data } = action.payload;
                if (state.getReplies.data) {
                  const prevComments = JSON.parse(JSON.stringify(state.getReplies.data));
                  state.getReplies.data = [...prevComments, data]
                }
                state.addReply.message = message;
            }
        })
        builder.addCase(actions.addReply.rejected, (state) => {
          state.addReply = { loading: false, error: true };
        });
        // Get All Comments
        builder.addCase(actions.getReplies.pending, (state) => {
          state.getReplies = { loading: true, error: false };
        });
        builder.addCase(actions.getReplies.fulfilled, (state, action) => {
          state.getReplies = { loading: false, error: false };
            if (action.payload) {
              const { message, data } = action.payload; 
              state.getReplies.data = data;
              state.getReplies.message = message;
            }
        })
        builder.addCase(actions.getReplies.rejected, (state) => {
          state.getReplies = { loading: false, error: true };
        });
        // Get Comment By Id
        builder.addCase(actions.getReplyById.pending, (state) => {
          state.getReplyById = { loading: true, error: false };
        });
        builder.addCase(actions.getReplyById.fulfilled, (state, action) => {
          state.getReplyById = { loading: false, error: false };
            if (action.payload) {
              const { message, data } = action.payload; 
              state.getReplyById.data = data;
              state.getReplyById.message = message;
            }
        })
        builder.addCase(actions.getReplyById.rejected, (state) => {
          state.getReplyById = { loading: false, error: true };
        });
        // Edit Comment
        builder.addCase(actions.editReply.pending, (state) => {
          state.editReply = { loading: true, error: false };
        });
        builder.addCase(actions.editReply.fulfilled, (state, action) => {
          state.editReply = { loading: false, error: false };
            if (action.payload) {
              const { message, data } = action.payload; 
              // state.editReply.data = data;
              state.editReply.message = message;
            }
        })
        builder.addCase(actions.editReply.rejected, (state) => {
          state.editReply = { loading: false, error: true };
        });
        // Delete Comment
        builder.addCase(actions.deleteReply.pending, (state) => {
          state.deleteReply = { loading: true, error: false };
        });
        builder.addCase(actions.deleteReply.fulfilled, (state, action) => {
          state.deleteReply = { loading: false, error: false };
          if (action.payload) {
          const { response, message } = action.payload;
          state.getReplies.data = JSON.parse(JSON.stringify(
            state.getReplies.data?.filter(
              (comment) => comment.id !== response.id
            ))) 
            state.deleteReply.message = message;
          }
        })
        builder.addCase(actions.deleteReply.rejected, (state) => {
          state.deleteReply = { loading: false, error: true };
        });
    }
})

export default replySlice.reducer;