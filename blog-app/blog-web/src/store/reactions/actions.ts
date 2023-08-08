import { createAsyncThunk } from "@reduxjs/toolkit";

export const addReaction = createAsyncThunk(
  endpoints.ADD_COMMENT,
  async (data: AddCommentPayload) => {
    try {
      const response = await api.post(endpoints.ADD_COMMENT, data);
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
