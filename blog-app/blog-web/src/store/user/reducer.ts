import { createSlice } from "@reduxjs/toolkit";
import { subState } from "store/states";
import * as actions from "./actions";
import { UserState } from "./types";

const initialState: UserState = {
    updateUser: { ...subState }
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        // updateUser
        builder.addCase(actions.updateById.pending, (state) => {
            state.updateUser = {loading: true, error: false};
            // state.updateUser!.loading = true;
            // state.updateUser!.error = false;
        })
        builder.addCase(actions.updateById.fulfilled, (state, action) => {
            state.updateUser!.loading = false;
            state.updateUser!.error = false;
            state.updateUser!.data = action.payload;
        })
        builder.addCase(actions.updateById.rejected, (state) => {
            state.updateUser!.loading = false;
            state.updateUser!.error = true;
        })
    }
});

export default userSlice.reducer;