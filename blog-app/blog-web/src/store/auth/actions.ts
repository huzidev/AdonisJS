import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import * as endpoints from "./endpoints";


export const getBlogs = createAsyncThunk(endpoints.GET_BLOGS, async () => {
    try {
       const response = await api.get(endpoints.GET_BLOGS);
       return await response.data.data;
    } catch (e) {
        console.log("Error", e);
    }
});


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