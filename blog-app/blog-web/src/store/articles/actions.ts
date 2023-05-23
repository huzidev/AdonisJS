import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import * as endpoints from "./endpoints";

export const getBlog = createAsyncThunk(endpoints.GET_BLOG, async () => {
    try {
       const response = await api.get(endpoints.GET_BLOG);
       console.log("Response from redux", response);
       
    } catch (e) {
        console.log("Error", e);
    }
});
