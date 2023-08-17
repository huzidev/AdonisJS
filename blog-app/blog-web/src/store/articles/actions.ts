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
  GetBlogsByIdTest,
  RemoveFavoriteBlogPayload,
  UpdateBlogPayload
} from "./types";

export const getMyList = createAsyncThunk(
  endpoints.GET_BLOGS + "me",
  async (data: any): Promise<AllBlogs | null> => {
    // AllBlogs contains Array of blogs and meta
    try {
      const { userId, page } = data.payload;
      const response = await api.get(`${endpoints.GET_BLOGS + userId}/${page}`, {params: data});
      return {
        data : response.data.data.data,
        meta: response.data.data.meta,
        message: response.data.message
      };
    } catch (e: any) {
      const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
    }
  }
);

export const getBlogsList = createAsyncThunk(
  endpoints.GET_BLOGS + "all",
  async (data: any): Promise<AllBlogs | null> => {
    // AllBlogs contains Array of blogs and meta
    try {
      const response = await api.get(endpoints.GET_BLOGS + data.page, {params: data});
      return {
        data: response.data.data.data,
        meta: response.data.data.meta,
        message: response.data.message
      };
    } catch (e: any) {
      const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
    }
  }
);

export const getBlogs = createAsyncThunk(
  endpoints.GET_BLOGS,
  async (data: any): Promise<AllBlogs | null> => {
    // AllBlogs contains Array of blogs and meta
    try {
      console.log("data", data);
      const response = await api.get(endpoints.GET_BLOGS + data.page, {params: data});
      const filtersApplied = data.sort !== undefined;
      return {
        data: response.data.data.data,
        meta: response.data.data.meta,
        message: response.data.message,
        filters: filtersApplied
      };
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
  async (data: GetBlogsByIdTest): Promise<AllBlogs | null> => {
    // AllBlogs contains Array of blogs and meta
    try {
      console.log("data", data);
      const response = await api.get(`${endpoints.GET_BLOGS + data.userId}/${data.page}`, {params: data.filters});
      return {
        data : response.data.data.data,
        meta: response.data.data.meta
      };
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
      console.log("Add Blog Response", response);
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
      console.log("RESPONSE FOR ADD FAVORITE", response);
      return response.data;
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
  async (data: RemoveFavoriteBlogPayload) => {
    console.log("DATA", data);
    
    try {
      const response = await api.delete(endpoints.REMOVE_FAVORITE_BLOG + data.articleId, {data});
      console.log("RESPONSE FOR REMOVE FAVORITE", response);
      return response.data;
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
      return response.data;
    } catch (e: any) {
      const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
    }
  }
);
