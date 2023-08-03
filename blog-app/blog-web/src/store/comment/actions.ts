import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "services/api";
import { mapErrorToState } from "store/utils";
import { errorNotification } from "utils/notifications";
import * as endpoints from "./endpoints";

export const add = createAsyncThunk(
  endpoints.ADD_COMMENT,
  async (data: any) => {
    try {
      const response = await api.post(endpoints.ADD_COMMENT, data);
    } catch (e: any) {
      const err = mapErrorToState(e);
        errorNotification(err);
        console.log("Error", err);
        throw e
    }
  }
);