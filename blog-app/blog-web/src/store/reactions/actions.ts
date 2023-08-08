import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "services/api";
import { mapErrorToState } from "store/utils";
import { errorNotification } from "utils/notifications";
import * as endpoints from "./endpoints";
import { AddReactionState } from "./types";


export const addReaction = createAsyncThunk(
  endpoints.ADD_REACTION,
  async (data: AddReactionState) => {
    try {
      const response = await api.post(endpoints.ADD_REACTION, data);
      console.log('Add Comment response', response.data);
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
