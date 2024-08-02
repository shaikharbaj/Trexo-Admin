import { tableConfig } from "@/config/table.config";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Meta {
    currentPage: number;
    lastPage: number;
    next: number | null;
    perPage: number;
    prev: number | null;
    total: number;
}

export interface PaginationState {
    meta: Meta;
}

const initialState: PaginationState = {
    meta: {
        currentPage: tableConfig.currentPage,
        lastPage: tableConfig.lastPage,
        next: null,
        perPage: tableConfig.perPage,
        prev: null,
        total: tableConfig.total,
    },
};

export const paginate = createSlice({
    name: "paginate",
    initialState,
    reducers: {
        setPagination: (state, action: PayloadAction<Meta>) => {
            state.meta = action.payload;
        },
        setPageSize: (state, action: PayloadAction<number>) => {
            state.meta.perPage = action.payload;
            state.meta.currentPage = 1; // Reset to the first page when page size changes
        },
        nextPage: (state) => {
            if (state.meta.next !== null) {
                state.meta.currentPage = state.meta.next;
            }
        },
        previousPage: (state) => {
            if (state.meta.prev !== null) {
                state.meta.currentPage = state.meta.prev;
            }
        },
        setPageIndex: (state, action: PayloadAction<number>) => {
            if (action.payload >= 1 && action.payload <= state.meta.lastPage) {
                state.meta.currentPage = action.payload;
            }
        },
        resetPagination: (state) => {
            state.meta = initialState.meta;
        },
    },
});

export const { setPagination, setPageSize, nextPage, previousPage, setPageIndex, resetPagination } = paginate.actions;

export default paginate.reducer;
