import { createSlice } from "@reduxjs/toolkit";
import { subState } from "store/states";
import * as actions from "./actions";
import { ReactionState } from "./types";

const initialState: ReactionState = {
  addReaction: { ...subState },
  getReactions: { ...subState },
  getAllReactions: { ...subState },
};

export const reactionSlice = createSlice({
  name: "reactions",
  initialState,
  reducers: {
    reactions: (state) => {
      if (state.addReaction) {
        state.getReactions = state.getReactions;
      }
    }
  },
  extraReducers: (builder) => {
    // Add Reactions (Likes, Dislikes)
    builder.addCase(actions.addReaction.pending, (state) => {
      state.addReaction = { loading: true, error: false };
    });
    builder.addCase(actions.addReaction.fulfilled, (state, action) => {
      state.addReaction = { loading: false, error: false };
      if (action.payload) {
        state.addReaction.message = action.payload.message;
      }
    });
    builder.addCase(actions.addReaction.rejected, (state) => {
      state.addReaction = { loading: false, error: true };
    });
    // Get Reactions (Likes, Dislikes)
    builder.addCase(actions.getReactions.pending, (state) => {
      state.getReactions = { loading: true, error: false };
    });
    builder.addCase(actions.getReactions.fulfilled, (state, action) => {
      state.getReactions = { loading: false, error: false };
      if (action.payload) {
        const { message, data } = action.payload;
        state.getReactions.data = data;
        state.getReactions.message = message;
      }
    });
    builder.addCase(actions.getReactions.rejected, (state) => {
      state.getReactions = { loading: false, error: true };
    });
    // Get All Reactions For Every Single Blogs
    builder.addCase(actions.getAllReactions.pending, (state) => {
      state.getAllReactions = { loading: true, error: false };
    });
    builder.addCase(actions.getAllReactions.fulfilled, (state, action) => {
      state.getAllReactions = { loading: false, error: false };
      if (action.payload) {
        const { message, data } = action.payload;
        state.getAllReactions.data = data;
        state.getAllReactions.message = message;
      }
    });
    builder.addCase(actions.getAllReactions.rejected, (state) => {
      state.getAllReactions = { loading: false, error: true };
    });
  },
});

export default reactionSlice.reducer;
