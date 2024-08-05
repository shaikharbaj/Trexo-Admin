import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import datatableSlice from "./datatable.slice";
import industrySlice from "./industry.slice";
import paginateSlice from "./paginate.slice";
import profileSlice from "./profile.slice";

const rootReducer = combineReducers({
    auth: authSlice,
    datatable: datatableSlice,
    industry: industrySlice,
    paginate: paginateSlice,
    profile: profileSlice
});

export default rootReducer;
