import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "services/api";
import { mapErrorToState } from "store/utils";
import { errorNotification } from "utils/notifications";
import * as endpoints from "./endpoints";
import { AddReplyPayload, EditReplyPayload } from "./types";

export const addReply = createAsyncThunk(
  endpoints.ADD_REPLY,
  async (data: AddReplyPayload) => {
    try {
      const response = await api.post(endpoints.ADD_REPLY, data);
      console.log("Add Reply response", response.data);
      return {
        message: response.data.message,
        data: response.data.data,
      };
    } catch (e: any) {
      const err = mapErrorToState(e);
      errorNotification(err);
      console.log("Error", err);
      throw e;
    }
  }
);

export const getReplies = createAsyncThunk(
  endpoints.GET_REPLIES,
  async (articleId: number) => {
    try {
      const response = await api.get(endpoints.GET_REPLIES + articleId);
      return response.data;
    } catch (e: any) {
      const err = mapErrorToState(e);
      errorNotification(err);
      console.log("Error", err);
      throw e;
    }
  }
);

export const getReplyById = createAsyncThunk(
  endpoints.GET_REPLY,
  async (id: number) => {
    try {
      const response = await api.get(endpoints.GET_REPLY + id);
      return response.data;
    } catch (e: any) {
      const err = mapErrorToState(e);
      errorNotification(err);
      console.log("Error", err);
      throw e;
    }
  }
);

export const editReply = createAsyncThunk(
  endpoints.EDIT_REPLY,
  async (data: EditReplyPayload) => {
    console.log("data", data);
    try {
      const response = await api.put(endpoints.EDIT_REPLY + data.id, {
        reply: data.reply,
      });
      console.log("Edit Reply RESP", response.data);
      return response.data;
    } catch (e: any) {
      const err = mapErrorToState(e);
      errorNotification(err);
      console.log("Error", err);
      throw e;
    }
  }
);

export const deleteReply = createAsyncThunk(
  endpoints.DELETE_REPLY,
  async (articleId: number) => {
    try {
      const response = await api.delete(endpoints.DELETE_REPLY + articleId);
      console.log("RESPONSE from delete REPLY", response);
      return response.data;
    } catch (e: any) {
      const err = mapErrorToState(e);
      errorNotification(err);
      console.log("Error", err);
      throw e;
    }
  }
);
