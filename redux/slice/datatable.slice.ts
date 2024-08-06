import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDataThunk } from "../thunk/datatable.thunk";
import { tableConfig } from "@/config/table.config";

interface Meta {
  currentPage: number;
  lastPage: number;
  next: number | null;
  perPage: number;
  prev: number | null;
  total: number;
}

const initialState = {
  isLoading: false,
  refresh: false,
  data: [],
  filters: {
    searchText: "",
    is_active: "",
    order: "desc",
    column: "id"
  },
  pagination: {
    currentPage: tableConfig.currentPage,
    lastPage: tableConfig.lastPage,
    next: null,
    perPage: tableConfig.perPage,
    prev: null,
    total: tableConfig.total,
  },
  error: {},
};

export const datatable = createSlice({
  name: "datatable",
  initialState,
  reducers: {
    resetData: (state) => {
      state.data = [];
      state.pagination = initialState.pagination;
    },
    setSearchText: (state, action: PayloadAction<any>) => {
      state.filters = {
        ...state.filters,
        searchText: action.payload
      }
      state.pagination.currentPage = 1;
    },
    setStatus: (state, action: PayloadAction<any>) => {
      state.filters = {
        ...state.filters,
        is_active: action.payload
      }
      state.pagination.currentPage = 1;
    },
    setSorting: (state, action: PayloadAction<any>) => {
      state.filters = {
        ...state.filters,
        order: action.payload?.order,
        column: action.payload?.column
      }
      state.pagination.currentPage = 1;
    },
    resetFilter: (state) => {
      state.filters = initialState.filters;
      state.pagination = initialState.pagination;
    },
    refreshData: (state) => {
      state.refresh = !state.refresh;
    },
    setPagination: (state, action: PayloadAction<any>) => {
      state.pagination = action.payload?.pagination;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pagination.perPage = action.payload;
      state.pagination.currentPage = 1; // Reset to the first page when page size changes
    },
    nextPage: (state) => {
      if (state.pagination.next !== null) {
        state.pagination.currentPage = state.pagination.next;
      }
    },
    previousPage: (state) => {
      if (state.pagination.prev !== null) {
        state.pagination.currentPage = state.pagination.prev;
      }
    },
    setPageIndex: (state, action: PayloadAction<number>) => {
      if (action.payload >= 1 && action.payload <= state.pagination.lastPage) {
        state.pagination.currentPage = action.payload;
      }
    },
    resetPagination: (state) => {
      state.pagination = initialState.pagination;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchDataThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(fetchDataThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.data = action?.payload?.data?.result || [];
        state.pagination = action?.payload?.data?.meta;
      })
      .addCase(fetchDataThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

export const {
  resetData,
  setSearchText,
  setStatus,
  setSorting,
  resetFilter,
  refreshData,
  setPagination,
  setPageSize,
  nextPage,
  previousPage,
  setPageIndex,
  resetPagination,
} = datatable.actions;

export default datatable.reducer;
