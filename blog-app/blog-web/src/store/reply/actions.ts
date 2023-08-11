import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "services/api";
import { mapErrorToState } from "store/utils";
import { errorNotification } from "utils/notifications";
import * as endpoints from "./endpoints";
import { AddCommentPayload, EditCommentPayload } from "./types";

export const addComment = createAsyncThunk(
  endpoints.ADD_REPLY,
  async (data: AddCommentPayload) => {
    try {
      const response = await api.post(endpoints.ADD_REPLY, data);
      console.log('Add Reply response', response.data);
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
  endpoints.GET_REPLIES,
  async (articleId: number) => {
    try {
      const response = await api.get(endpoints.GET_REPLIES + articleId);
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
  endpoints.GET_REPLY,
  async (id: number) => {
    try {
      const response = await api.get(endpoints.GET_REPLY + id);
      return response.data;
    } catch (e: any) {
      const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
      }
    }
);

export const editComment = createAsyncThunk(
  endpoints.EDIT_REPLY,
  async (data: EditCommentPayload) => {
    console.log("data", data);
    try {
      const response = await api.put(endpoints.EDIT_REPLY + data.id, {comment: data.comment});
      console.log("Edit COMMENT RESP", response.data);
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
  endpoints.DELETE_REPLY,
  async (articleId: number) => {
    try {
      const response = await api.delete(endpoints.DELETE_REPLY + articleId);
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