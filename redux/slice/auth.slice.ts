import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../thunk/auth.thunk";


const localStorageData: any = {}; //Getting value from local storage
const initialState = {
  isLoading: false,
  isLoggedIn: localStorageData?.isLoggedIn
    ? localStorageData.isLoggedIn
    : false,
  token: localStorageData?.token ? localStorageData.token : "",
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.isLoggedIn = false;
      state.token = "";
    },
    setAuth: (state, action) => {
      state.isLoggedIn = true;
      state.token = action?.payload?.token;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(loginThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state: any, action: any) => {
        state.isLoggedIn = true;
        state.token = action?.payload?.token;
        state.isLoading = false;
      })
      .addCase(loginThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

export const { setAuth, resetAuth } = auth.actions;

export default auth.reducer;
