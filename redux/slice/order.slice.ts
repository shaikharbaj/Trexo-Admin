import { createSlice } from "@reduxjs/toolkit";
import { orderListThunk } from "../thunk/order.thunk";

const initialState = {
  isLoading: false,
  list: [],
  error: {},
  refresh: false,
};

export const order = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(orderListThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(orderListThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.list = action?.payload?.data?.result || [];
      })
      .addCase(orderListThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

export const { resetList } = order.actions;

export default order.reducer;
