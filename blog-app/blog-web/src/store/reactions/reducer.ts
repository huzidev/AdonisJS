import { createSlice } from "@reduxjs/toolkit";
import { subState } from "store/states";
import { ReactionState } from "./types";

const initialState: ReactionState = {
    addReaction:  { ...subState },
}

export const reactionSlice = createSlice({
    name: "reactions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        
    }
})

export default reactionSlice.reducer;
