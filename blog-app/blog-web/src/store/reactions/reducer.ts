import { createSlice } from "@reduxjs/toolkit";
import { subState } from "store/states";
import * as actions from "./actions";
import { ReactionState } from "./types";

const initialState: ReactionState = {
    addReaction:  { ...subState },
    getReactions:  { ...subState, data: null }
}

export const reactionSlice = createSlice({
    name: "reactions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
         builder.addCase(actions.addReaction.pending, (state) => {
          state.addReaction = { loading: true, error: false };
        });
        builder.addCase(actions.addReaction.fulfilled, (state, action) => {
            state.addReaction = { loading: false, error: false };
            if (action.payload) {
                state.addReaction.message = action.payload.message;
            }
        })
        builder.addCase(actions.addReaction.rejected, (state) => {
          state.addReaction = { loading: false, error: true };
        });
    }
})

export default reactionSlice.reducer;
