import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import * as endpoints from "./endpoints";
import { UserSignInState, UserState } from "./types";

export const signUp = createAsyncThunk(endpoints.SIGNUP, async (data: UserState) => {
    try {
        const response = await api.post(endpoints.SIGNUP, data);
        console.log("Response", response);
    } catch (e) {
        console.log("Error", e);
    }
});

export const signIn = createAsyncThunk(endpoints.SIGNIN, async (data: UserSignInState) => {
    try {
        const response = await api.post(endpoints.SIGNIN, data);
        console.log("Sign in resp", response);
        
    } catch (e) {
        console.log("Error", e);
    }
})


// const getBlogSlice = createSlice({
//     name: "blogs",
//     initialState: initialState,
//     reducers : {},
//     extraReducers: (builder) => {
//         builder.addCase(getBlogs.fulfilled, (state, action) => {
//             state.allBlogs = action.payload;
//         })
//         builder.addCase(getBlog.fulfilled, (state, action) => {
//             state.getBlog = action.payload;
//         })
//     }
// });

// export default getBlogSlice.reducer;