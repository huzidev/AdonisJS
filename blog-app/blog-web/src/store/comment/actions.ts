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
      console.log("ADD COMMENT RESPONSE", response);
      return response.data;
    } catch (e: any) {
      const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
    }
  }
);