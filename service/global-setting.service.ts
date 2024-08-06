import { refreshData } from "@/redux/slice/datatable.slice";
import { store } from "@/redux/store";
import { createGlobalSettingThunk } from "@/redux/thunk/global-setting.thunk";


export const createGlobalSetting = async (createPayload: any) => {
    try {
        const { payload } = await store.dispatch(createGlobalSettingThunk(createPayload));
        if (payload?.status !== true) {
            return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
        }
        store.dispatch(refreshData());
        return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Something went wrong."
        );
    }

}