import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import datatableSlice from "./datatable.slice";
import industrySlice from "./industry.slice";
import profileSlice from "./profile.slice";

const rootReducer = combineReducers({
    auth: authSlice,
    datatable: datatableSlice,
    industry: industrySlice,
    profile: profileSlice
});

export default rootReducer;
