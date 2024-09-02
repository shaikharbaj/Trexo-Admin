import queryString from "query-string";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";

//Thunk to fetch list of admin,seller and
interface IListPayload {
  pageSize: number;
  currentPage: number;
  seachFilter: string;
}

export const adminListThunk = createAsyncThunk(
  "user/fetchAllAdmin",
  async (payload: IListPayload) => {
    try {
      const queryParams = queryString.stringify(payload);
      const res = await privateClient.get(`/admin?${queryParams}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

export const supplierListThunk = createAsyncThunk(
  "user/fetchAllSupplier",
  async (payload: IListPayload) => {
    try {
      const queryParams = queryString.stringify(payload);
      const res = await privateClient.get(`/seller?${queryParams}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

export const consumerListThunk = createAsyncThunk(
  "user/fetchAllConsumers",
  async (payload: IListPayload) => {
    try {
      const queryParams = queryString.stringify(payload);
      const res = await privateClient.get(`/user?${queryParams}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

export const financierListThunk = createAsyncThunk(
  "user/fetchAllFinanciers",
  async (payload: IListPayload) => {
    try {
      const queryParams = queryString.stringify(payload);
      const res = await privateClient.get(`/financier?${queryParams}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

interface loadSellerBasicInfoByIdPayload {
  uuid: string;
}
export const loadSellerBasicInfoByIdThunk = createAsyncThunk(
  "user/loadSupplierBasicInfoById",
  async (payload: loadSellerBasicInfoByIdPayload) => {
    try {
      const res = await privateClient.get(
        `/seller/basic-information/${payload}`
      );
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

interface loadConsumerBasicInfoByIdPayload {
  uuid: string;
}
export const loadConsumerBasicInfoByIdThunk = createAsyncThunk(
  "user/loadConsumerBasicInfoById",
  async (payload: loadConsumerBasicInfoByIdPayload) => {
    try {
      const res = await privateClient.get(`/user/basic-information/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

interface loadFinancierBasicDetailsInfoById {
  uuid: string;
}
export const loadFinancierBasicInfoByIdThunk = createAsyncThunk(
  "user/loadFinancierBasicInfoById",
  async (payload: loadFinancierBasicDetailsInfoById) => {
    try {
      const res = await privateClient.get(
        `/financier/basic-information/${payload}`
      );
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

interface loadAdminUserBasicInfoByIdPayload {
  uuid: string;
}
export const loadAdminBasicInfoByIdThunk = createAsyncThunk(
  "user/loadAdminBasicInfoById",
  async (payload: loadAdminUserBasicInfoByIdPayload) => {
    try {
      const res = await privateClient.get(
        `/admin/basic-information/${payload}`
      );
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to fetch seller bank details by id...
interface loadSellerBankDetailsByIdPayload {
  uuid: string;
}
export const loadSellerBankDetailsByIdThunk = createAsyncThunk(
  "user/loadSellerBankDetailsById",
  async (payload: loadSellerBankDetailsByIdPayload) => {
    try {
      const res = await privateClient.get(`/seller/bank-details/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to fetch seller verification by id
interface fetchSellerVerificationByIdPayload {
  uuid: string;
}
export const fetchSellerVerificationByIdThunk = createAsyncThunk(
  "user/loadSellerVerificationById",
  async (payload: fetchSellerVerificationByIdPayload) => {
    try {
      const res = await privateClient.get(`/seller/verification/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to fetch  seller documents by id
interface fetchSellerDocumentsByIdPayload {
  uuid: string;
}
export const fetchSellerDocumentsByIdThunk = createAsyncThunk(
  "user/loadSellerDocuments",
  async (payload: fetchSellerDocumentsByIdPayload) => {
    try {
      const res = await privateClient.get(`/seller/document/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);
