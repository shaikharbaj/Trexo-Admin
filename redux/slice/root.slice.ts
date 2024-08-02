import { combineReducers } from "@reduxjs/toolkit";
import languageSlice from "./language.slice";
import authSlice from "./auth.slice";
import profileSlice from "./profile.slice";

const rootReducer = combineReducers({
    language: languageSlice,
    auth: authSlice,
    profile: profileSlice
});

export default rootReducer;
