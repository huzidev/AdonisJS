import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import * as endpoints from "./endpoints";
import { AddBlogPayload, BlogDetail, UpdateBlogPayload } from "./types";

export const getBlogs = createAsyncThunk(endpoints.GET_BLOGS, async (): Promise<BlogDetail | null> => {
    try {
       const response = await api.get(endpoints.GET_BLOGS);
       return response.data.data;
    } catch (e) {
        console.log("Error", e);
        throw e
    }
});

export const getBlog = createAsyncThunk(endpoints.GET_BLOG, async (slug: string) => {
    try {
        const response = await api.get(endpoints.GET_BLOG + slug);
        console.log("response", response.data.data);
        return response.data.data;
    } catch (e) {
        console.log("Error", e);
    }
});

export const addBlog = createAsyncThunk(endpoints.ADD_BLOG, async (data: AddBlogPayload) => {
    try {
        const response = await api.post(endpoints.ADD_BLOG, data);
        if (response.status === 200) {
            alert("Blog added");
        }
        console.log("Add Blog", response);
        return response.data.data;
    } catch (e) {
        console.log("Erro", e);
    }
});

export const updateBlog = createAsyncThunk(endpoints.UPDATE_BLOG, async (data: UpdateBlogPayload) => {
    try {
        const response = await api.put(endpoints.UPDATE_BLOG + data.id, data);
        alert("Blog updated");
        console.log("Update", response);
        return response.data.data;
    } catch (e) {
        console.log("Error", e);
        
    }
});

export const deleteBlog = createAsyncThunk(endpoints.DELETE_BLOG, async (id: number) => {
    try {
        await api.delete(endpoints.DELETE_BLOG + id);
    } catch (e) {
        console.log("Error", e);
    }
});