import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";

export const globalSettingListThunk = createAsyncThunk(
    "global_setting/fetch",
    async () => {
        try {
            const res = await privateClient.get(`/global-setting`);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

//Thunk to create global setting
interface ICreateGlobalSettingPayload {
    site_name: string;
    site_email: string;
    phone: string;
    address: string;
    otp_explore_time: number;
    revenue_percentage: number;
    currency_symbol: string;
    meta_title: string;
    meta_keyword: string;
    meta_description: string;
    footer_content: string;
    time_zone: string;
}

export const createGlobalSettingThunk = createAsyncThunk(
    "global_setting/create",
    async (payload: ICreateGlobalSettingPayload) => {
        try {
            const res = await privateClient.post("/global-setting", payload);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

