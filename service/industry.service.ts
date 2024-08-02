import { setPagination } from "@/redux/slice/paginate.slice";
import { store } from "@/redux/store";
import { createIndustryThunk, deleteIndustryThunk, industryListThunk } from "@/redux/thunk/industry.thunk";


//Function to fetch industry list with filter
export const fetchIndustryWithFilter = async (listPayload: any) => {
  try {
    const { payload } = await store.dispatch(industryListThunk(listPayload));
    if (payload?.status !== true) {
      return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
    }
    store.dispatch(setPagination(payload?.data?.meta));    
    return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
};

//Function to create industry
export const createIndustry = async (createPayload: any) => {
  try {
    const { payload } = await store.dispatch(createIndustryThunk(createPayload));
    if (payload?.status !== true) {
      return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
    }
    return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
};

//Function to delete industry
export const deleteIndustry = async (deletePayload: any) => {
  try {
    const { payload } = await store.dispatch(deleteIndustryThunk(deletePayload));
    if (payload?.status !== true) {
      return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
    }
    return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
};