import { createSlice } from "@reduxjs/toolkit";
import flag1 from "@/public/images/all-img/flag-1.png";
import { getLocalStorage } from "@/utils/local-storage";

const localLanguage = getLocalStorage('TREXOPRO_ADMIN_LANG');
const initialState = {
  flag: (localLanguage?.flag) ? localLanguage.flag : flag1,
  name: (localLanguage?.name) ? localLanguage.name : "en",
};

export const language = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.flag = action?.payload?.flag;
      state.name = action?.payload?.name;
    },
  },
});

export const { setLanguage } = language.actions;

export default language.reducer;
