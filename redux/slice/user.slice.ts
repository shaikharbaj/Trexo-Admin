import { createSlice } from "@reduxjs/toolkit";
import {
  adminListThunk,
  consumerListThunk,
  supplierListThunk,
} from "../thunk/user.thunk";

const initialState = {
  isLoading: false,
  list: [],
  error: {},
  refresh: false,
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(adminListThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(adminListThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.list = action?.payload?.data?.result || [];
      })
      .addCase(adminListThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(supplierListThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(supplierListThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.list = action?.payload?.data?.result || [];
      })
      .addCase(supplierListThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(consumerListThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(consumerListThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.list = action?.payload?.data?.result || [];
      })
      .addCase(consumerListThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

export const { resetList } = user.actions;

export default user.reducer;
