import { createSlice } from "@reduxjs/toolkit";
import { subState } from "store/states";
import * as actions from "./actions";
import { ReactionState } from "./types";

const initialState: ReactionState = {
    addReaction:  { ...subState, data: null },
}

export const reactionSlice = createSlice({
    name: "reactions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
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
    }
})

export default reactionSlice.reducer;
