import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "services/api";
import { mapErrorToState } from "store/utils";
import { errorNotification } from "utils/notifications";
import * as endpoints from "./endpoints";
import { AddCommentPayload } from "./types";

export const addComment = createAsyncThunk(
  endpoints.ADD_COMMENT,
  async (data: AddCommentPayload) => {
    try {
      const response = await api.post(endpoints.ADD_COMMENT, data);
      console.log('Add Blog response', response.data);
      return {
        message: response.data.message,
        data: response.data.data
      };
    } catch (e: any) {
      const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
    }
  }
);

export const getComments = createAsyncThunk(
  endpoints.GET_COMMENTS,
  async (articleId: number) => {
    try {
      const response = await api.get(endpoints.GET_COMMENTS + articleId);
      return response.data;
    } catch (e: any) {
      const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
      }
    }
);

export const getCommentById = createAsyncThunk(
  endpoints.GET_COMMENT,
  async (id: number) => {
    try {
      const response = await api.get(endpoints.GET_COMMENT + id);
      console.log("GET COMMENT RESP", response.data);
      
      return response.data;
    } catch (e: any) {
      const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
      }
    }
);

export const deleteComment = createAsyncThunk(
  endpoints.DELETE_COMMENT,
  async (articleId: number) => {
    try {
      const response = await api.delete(endpoints.DELETE_COMMENT + articleId);
      console.log("RESPONSE fro delete comment", response);
      return response.data
    } catch (e: any) {
      const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
      }
    }
);