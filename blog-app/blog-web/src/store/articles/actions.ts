import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "services/api";
import { mapErrorToState } from "store/utils";
import { errorNotification } from "utils/notifications";
import * as endpoints from "./endpoints";
import {
  AddBlogPayload,
  AddFavoriteBlogPayload,
  AllBlogs,
  GetBlogPayload,
  GetBlogsById,
  UpdateBlogPayload,
} from "./types";

export const getBlogs = createAsyncThunk(
  endpoints.GET_BLOGS,
  async (page: number): Promise<AllBlogs | null> => {
    // AllBlogs contains Array of blogs and meta
    try {
      const response = await api.get(endpoints.GET_BLOGS + page);
      console.log("Respose for all blogs", response);
      return response.data;
    } catch (e: any) {
      const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
    }
  }
);

export const getBlogsById = createAsyncThunk(
  endpoints.GET_BLOGS + "id",
  async (data: GetBlogsById): Promise<AllBlogs | null> => {
    // AllBlogs contains Array of blogs and meta
    try {
      const { userId, page } = data;
      const response = await api.get(`${endpoints.GET_BLOGS + userId}/${page}`);
      console.log("response for all blogs BY ID", response.data);
      return response.data;
    } catch (e: any) {
      const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
    }
  }
);

export const getFavoriteBlogs = createAsyncThunk(
  endpoints.GET_FAVORITE_BLOGS,
  async (data: GetBlogsById): Promise<AllBlogs | null> => {
    // AllBlogs contains Array of blogs and meta
    try {
      const { userId, page } = data;
      const response = await api.get(
        `${endpoints.GET_FAVORITE_BLOGS + userId}/${page}`
      );
      console.log("response for all Favorite blogs", response.data);
      return response.data;
    } catch (e: any) {
      const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
    }
  }
);

export const getBlog = createAsyncThunk(
  endpoints.GET_BLOG,
  async (slug: GetBlogPayload) => {
    try {
      const response = await api.get(endpoints.GET_BLOG + slug);
      console.log("response for getblogs by slug", response);
      return response.data;
    } catch (e: any) {
      const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
    }
  }
);

export const addBlog = createAsyncThunk(
  endpoints.ADD_BLOG,
  async (data: AddBlogPayload) => {
    try {
      const response = await api.post(endpoints.ADD_BLOG, data);
      if (response.status === 200) {
        alert("Blog added");
      }
      console.log("Add Blog", response);
      return response.data;
    } catch (e: any) {
      const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
    }
  }
);

export const addFavoriteBlog = createAsyncThunk(
  endpoints.ADD_FAVORITE_BLOG,
  async (data: AddFavoriteBlogPayload) => {
    try {
      const response = await api.post(endpoints.ADD_FAVORITE_BLOG, data);
      if (response.status === 200) {
        alert("Blog added To Favorite");
      }
      console.log("Add Blog", response);
      return response.data.data;
    } catch (e: any) {
      const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
    }
  }
);

export const removeFavoriteBlog = createAsyncThunk(
  endpoints.REMOVE_FAVORITE_BLOG,
  async (id: number) => {
    try {
      const response = await api.delete(endpoints.REMOVE_FAVORITE_BLOG + id);
      if (response.status === 200) {
        alert("Blog Removed From Favorite");
      }
      return response.data.id;
    } catch (e: any) {
      const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
    }
  }
);

export const updateBlog = createAsyncThunk(
  endpoints.UPDATE_BLOG,
  async (data: UpdateBlogPayload) => {
    try {
      const response = await api.put(endpoints.UPDATE_BLOG + data.id, data);
      if (response.status === 200) {
        alert("Blog updated");
      }
      return response.data;
    } catch (e: any) {
      const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
    }
  }
);
  
export const deleteBlog = createAsyncThunk(
  endpoints.DELETE_BLOG,
  async (id: number) => {
    try {
      const response = await api.delete(endpoints.DELETE_BLOG + id);
      if (response.status === 200) {
        alert("Blog Deleted Successfully!");
      }
      return response.data.id;
    } catch (e: any) {
      const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
    }
  }
);
