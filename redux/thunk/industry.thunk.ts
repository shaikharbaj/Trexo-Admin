import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";
import queryString from "query-string";

//Thunk to fetch industry list
interface IListPayload {
  pageSize: number;
  currentPage: number;
  seachFilter: string;
}

export const industryListThunk = createAsyncThunk(
  "industry/fetch",
  async (payload: IListPayload) => {
    try {
      const queryParams = queryString.stringify(payload);
      const res = await privateClient.get(`/industry?${queryParams}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to create industry
interface ICreateIndustryPayload {
  industry_name: string;
}

export const createIndustryThunk = createAsyncThunk(
  "industry/create",
  async (payload: ICreateIndustryPayload) => {
    try {
      const res = await privateClient.post('/industry', payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to create industry
interface IDeleteIndustryPayload {
  uuid: string;
}

export const deleteIndustryThunk = createAsyncThunk(
  "industry/delete",
  async (payload: IDeleteIndustryPayload) => {
    try {
      const res = await privateClient.delete(`/industry/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);
