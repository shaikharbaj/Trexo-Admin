import { combineReducers } from "@reduxjs/toolkit";
import languageSlice from "./language.slice";
import authSlice from "./auth.slice";

const rootReducer = combineReducers({
    language: languageSlice,
    auth: authSlice
});

export default rootReducer;
