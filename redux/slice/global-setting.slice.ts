import { createSlice } from "@reduxjs/toolkit";
import { createGlobalSettingThunk, deleteGlobalSettingThunk, globalSettingListThunk } from "../thunk/global-setting.thunk";

const initialState = {
    isLoading: false,
    list: [],
    error: {},
    refresh: false
};

export const global_setting = createSlice({
    name: "globalSetting",
    initialState,
    reducers: {
        resetList: (state) => {
            state.list = [];
        }
    },
    extraReducers: (builder: any) => {
        builder
            .addCase(globalSettingListThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(globalSettingListThunk.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.list = action?.payload?.data || [];
            })
            .addCase(globalSettingListThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
        builder
            .addCase(createGlobalSettingThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(createGlobalSettingThunk.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action?.payload;
                state.refresh = !state.refresh;
            })
            .addCase(createGlobalSettingThunk.rejected, (state: any) => {
                state.isLoading = false;
            });

        builder
            .addCase(deleteGlobalSettingThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(deleteGlobalSettingThunk.fulfilled, (state: any) => {
                state.isLoading = false;
                state.refresh = !state.refresh;
            })
            .addCase(deleteGlobalSettingThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
    },
});

export const { resetList } = global_setting.actions;

export default global_setting.reducer;
