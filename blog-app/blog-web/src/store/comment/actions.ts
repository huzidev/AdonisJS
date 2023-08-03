import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "services/api";
import { mapErrorToState } from "store/utils";
import { errorNotification } from "utils/notifications";
import * as endpoints from "./endpoints";
import { AddCommentPayload, GetCommentsState } from "./types";

export const addComment = createAsyncThunk(
  endpoints.ADD_COMMENT,
  async (data: AddCommentPayload) => {
    try {
      const response = await api.post(endpoints.ADD_COMMENT, data);
      return response.data;
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
  async (data: GetCommentsState) => {
    try {
      const response = await api.get(endpoints.GET_COMMENTS + data.articleId);
      return response.data;
    } catch (e: any) {
      const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
      }
    }
);
