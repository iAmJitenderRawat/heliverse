import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersApi from "../../api/usersApi";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async ({ page=1, limit=20 }) => {
    const res = await usersApi.get(`/users?_limit=${limit}&_page=${page}`);
    return res?.data;
  }
);

export const getUsersSlice = createSlice({
  name: "getUsers",
  initialState: {
    users: [],
    status: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = action.error.message;
      });
  },
});

export default getUsersSlice.reducer;
