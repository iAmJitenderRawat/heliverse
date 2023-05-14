import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersApi from "../../api/usersApi";

export const getPages = createAsyncThunk("page/totalpages", async () => {
  const res = await usersApi.get("/users");
  return res?.data?.length;
});

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

export const pageSlice = createSlice({
  name: "pagination",
  initialState: {
    page: 1,
    totalUsers: 0,
  },
  reducers: {
    next: (state) => {
      state.page += 1;
    },

    prev: (state) => {
      state.page -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPages.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getPages.fulfilled, (state, action) => {
        state.totalUsers = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(getPages.rejected, (state, action) => {
        state.status = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { next, prev } = pageSlice.actions;

export default pageSlice.reducer;
