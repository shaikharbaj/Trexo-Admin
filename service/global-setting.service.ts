import { refreshData } from "@/redux/slice/datatable.slice";
import { store } from "@/redux/store";
import { createGlobalSettingThunk, globalSettingListThunk } from "@/redux/thunk/global-setting.thunk";


//Function to create global setting
export const createGlobalSetting = async (createPayload: any) => {
    try {
        const { payload } = await store.dispatch(createGlobalSettingThunk(createPayload));
        if (payload?.status !== true) {
            return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
        }
        return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Something went wrong."
        );
    }
}


//Function to fetch global setting
export const fetchGlobalSetting = async () => {
    try {
        const { payload } = await store.dispatch(globalSettingListThunk());
        if (payload?.status !== true) {
            return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
        }
        return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message, data: payload?.data };
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Something went wrong."
        );
    }
}