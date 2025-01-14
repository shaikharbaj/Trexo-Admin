import { store } from "@/redux/store";
import {
  fetchSellerVerificationByIdThunk,
  loadAdminBasicInfoByIdThunk,
  loadConsumerBasicInfoByIdThunk,
  loadFinancierBasicInfoByIdThunk,
  loadSellerBankDetailsByIdThunk,
  loadSellerBasicInfoByIdThunk,
  updateSellerBusinessDetailsStatusThunk,
  fetchSellerDocumentsByIdThunk,
  updateSellerBankDetailsStatusThunk,
  updateSellerVerificationDetailsStatusThunk,
  updateSellerDocumentDetailsStatusThunk,
} from "@/redux/thunk/user.thunk";
//Function to fetch consumer basic info by id
export const fetchConsumerBasicDetailsById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(
      loadConsumerBasicInfoByIdThunk(fetchByIdPayload)
    );
    if (payload?.status !== true) {
      return {
        status: payload?.status,
        statusCode: payload?.statusCode,
        message: payload?.message,
      };
    }
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data: payload?.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

//Function to fetch seller basic info by id
export const fetchSellerBasicDetailsById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(
      loadSellerBasicInfoByIdThunk(fetchByIdPayload)
    );
    if (payload?.status !== true) {
      return {
        status: payload?.status,
        statusCode: payload?.statusCode,
        message: payload?.message,
      };
    }
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data: payload?.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

//Function to fetch admin basic info by id
export const fetchAdminBasicDetailsById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(
      loadAdminBasicInfoByIdThunk(fetchByIdPayload)
    );
    if (payload?.status !== true) {
      return {
        status: payload?.status,
        statusCode: payload?.statusCode,
        message: payload?.message,
      };
    }
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data: payload?.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

//Function to fetch financier basic info by id
export const fetchFinancierBasicDetailsById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(
      loadFinancierBasicInfoByIdThunk(fetchByIdPayload)
    );
    if (payload?.status !== true) {
      return {
        status: payload?.status,
        statusCode: payload?.statusCode,
        message: payload?.message,
      };
    }
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data: payload?.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

//Function to fetch seller bank details by id
export const fetchSellerBankDetailsById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(
      loadSellerBankDetailsByIdThunk(fetchByIdPayload)
    );
    if (payload?.status !== true) {
      return {
        status: payload?.status,
        statusCode: payload?.statusCode,
        message: payload?.message,
      };
    }
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data: payload?.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

//Function to fetch seller verification by id
export const fetchSellerVerificationById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(
      fetchSellerVerificationByIdThunk(fetchByIdPayload)
    );
    if (payload?.status !== true) {
      return {
        status: payload?.status,
        statusCode: payload?.statusCode,
        message: payload?.message,
      };
    }
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data: payload?.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

//Function to fetch seller document by id
export const fetchSellerDocumentById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(
      fetchSellerDocumentsByIdThunk(fetchByIdPayload)
    );
    if (payload?.status !== true) {
      return {
        status: payload?.status,
        statusCode: payload?.statusCode,
        message: payload?.message,
      };
    }
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data: payload?.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

//Function to fetch seller basic details status.
export const updateBusinessDetailsStatus = async (
  updateBusinessDetailsStatusPayload: any
) => {
  try {
    const { payload } = await store.dispatch(
      updateSellerBusinessDetailsStatusThunk(updateBusinessDetailsStatusPayload)
    );
    if (payload?.status !== true) {
      return {
        status: payload?.status,
        statusCode: payload?.statusCode,
        message: payload?.message,
      };
    }
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data: payload?.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

//Function to fetch seller bank details status.
export const updateBankDetailsStatus = async (
  updateBankingDetailsStatusPayload: any
) => {
  try {
    const { payload } = await store.dispatch(
      updateSellerBankDetailsStatusThunk(updateBankingDetailsStatusPayload)
    );
    if (payload?.status !== true) {
      return {
        status: payload?.status,
        statusCode: payload?.statusCode,
        message: payload?.message,
      };
    }
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data: payload?.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

//Function to fetch seller verification details status.
export const updateVerificationDetailsStatus = async (
  updateVerificaionDetailsStatusPayload: any
) => {
  try {
    const { payload } = await store.dispatch(
      updateSellerVerificationDetailsStatusThunk(
        updateVerificaionDetailsStatusPayload
      )
    );
    if (payload?.status !== true) {
      return {
        status: payload?.status,
        statusCode: payload?.statusCode,
        message: payload?.message,
      };
    }
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data: payload?.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

//Function to fetch seller document details status.
export const updateDocumentDetailsStatus = async (
  updateDocumentDetailsStatusPayload: any
) => {
  try {
    const { payload } = await store.dispatch(
      updateSellerDocumentDetailsStatusThunk(updateDocumentDetailsStatusPayload)
    );
    if (payload?.status !== true) {
      return {
        status: payload?.status,
        statusCode: payload?.statusCode,
        message: payload?.message,
      };
    }
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data: payload?.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};
