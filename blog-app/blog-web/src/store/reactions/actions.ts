import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "services/api";
import { mapErrorToState } from "store/utils";
import { errorNotification } from "utils/notifications";
import * as endpoints from "./endpoints";
import { AddReactionPayload, GetReactionPayload } from "./types";

export const addReaction = createAsyncThunk(
  endpoints.ADD_REACTION,
  async (data: AddReactionPayload) => {
    try {
      const response = await api.post(endpoints.ADD_REACTION, data);
      console.log('ADD REACTION RESPONSE', response);
      return response.data;
    } catch (e: any) {
      const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
    }
  }
);

export const getReactions = createAsyncThunk(
  endpoints.GET_REACTIONS,
  async (data: GetReactionPayload) => {
    try {
      const response = await api.get(endpoints.GET_REACTIONS + data.articleId + "/" + data.userId);
      console.log('GET REACTIONS RESPONSE', response);
      return response.data;
    } catch (e: any) {
      const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
    }
  }
);
