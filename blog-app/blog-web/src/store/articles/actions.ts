import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "services/api";
import * as endpoints from "./endpoints";
import { AddBlogPayload, AllBlogs, GetBlogPayload, GetBlogsById, UpdateBlogPayload } from "./types";

export const getBlogs = createAsyncThunk(endpoints.GET_BLOGS, async (page: number): Promise<AllBlogs | null> => {
    // AllBlogs contains Array of blogs and meta
    try {
       const response = await api.get(endpoints.GET_BLOGS + page);
       console.log("response for all blogs", response.data);
       return response.data;
    } catch (e) {
        console.log("Error", e);
        throw e
    }
});

export const getBlogsById = createAsyncThunk(endpoints.GET_BLOGS, async (data: GetBlogsById): Promise<AllBlogs | null> => {
    // AllBlogs contains Array of blogs and meta
    try {
       const { userId, page } = data;
       const response = await api.get(`${endpoints.GET_BLOGS + userId}/${page}`);
       console.log("response for all blogs BY ID", response.data);
       return response.data;
    } catch (e) {
        console.log("Error", e);
        throw e
    }
});

export const getFavoriteBlogs = createAsyncThunk(endpoints.GET_FAVORITE_BLOGS, async (data: GetBlogsById): Promise<AllBlogs | null> => {
    // AllBlogs contains Array of blogs and meta
    try {
       const { userId, page } = data;
       const response = await api.get(`${endpoints.GET_FAVORITE_BLOGS + userId}/${page}`);
       console.log("response for all blogs BY ID", response.data);
       return response.data;
    } catch (e) {
        console.log("Error", e);
        throw e
    }
});

export const getBlog = createAsyncThunk(endpoints.GET_BLOG, async (slug: GetBlogPayload) => {
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
        const response = await api.delete(endpoints.DELETE_BLOG + id);
        if (response.status === 200) {
            alert("Blog Deleted Successfully!")
        }
        return response.data.id
    } catch (e) {
        console.log("Error", e);
    }
});