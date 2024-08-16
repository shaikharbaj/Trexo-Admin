import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import datatableSlice from "./datatable.slice";
import industrySlice from "./industry.slice";
import profileSlice from "./profile.slice";
import countrySlice from "./country.slice";
import globalSettingSlice from "./global-setting.slice";
import modalSlice from "./modal.slice";
import citySlice from "./city.slice";
import uomSlice from "./uom.slice";
import attributeSlice from "./attribute.slice";
import cmsSlice from "./cms.slice";
import socialMediaSlice from "./social-media";
import contactusSlice from "./contact-us.slice";
const rootReducer = combineReducers({
  auth: authSlice,
  datatable: datatableSlice,
  industry: industrySlice,
  profile: profileSlice,
  country: countrySlice,
  globalSetting: globalSettingSlice,
  modal: modalSlice,
  city: citySlice,
  uom: uomSlice,
  attribute: attributeSlice,
  cms: cmsSlice,
  socialMedia:socialMediaSlice,
  contactus: contactusSlice,
});

export default rootReducer;
