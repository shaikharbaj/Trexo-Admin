import { combineReducers } from "@reduxjs/toolkit";
import languageSlice from "./language.slice";
import authSlice from "./auth.slice";
import industrySlice from "./industry.slice";
import paginateSlice from "./paginate.slice";
import profileSlice from "./profile.slice";

const rootReducer = combineReducers({
    auth: authSlice,
    industry: industrySlice,
    paginate: paginateSlice,
    language: languageSlice,
    profile: profileSlice
});

export default rootReducer;
