import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import datatableSlice from "./datatable.slice";
import industrySlice from "./industry.slice";
import profileSlice from "./profile.slice";
import modalSlice from "./modal.slice";

const rootReducer = combineReducers({
    auth: authSlice,
    datatable: datatableSlice,
    industry: industrySlice,
    profile: profileSlice,
    modal:modalSlice
});

export default rootReducer;
