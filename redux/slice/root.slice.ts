import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import industrySlice from "./industry.slice";
import paginateSlice from "./paginate.slice";

const rootReducer = combineReducers({
    auth: authSlice,
    industry: industrySlice,
    paginate: paginateSlice
});

export default rootReducer;
