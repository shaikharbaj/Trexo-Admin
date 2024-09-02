import { createSlice } from "@reduxjs/toolkit";
import {
  adminListThunk,
  consumerListThunk,
  fetchSellerDocumentsByIdThunk,
  fetchSellerVerificationByIdThunk,
  financierListThunk,
  loadAdminBasicInfoByIdThunk,
  loadConsumerBasicInfoByIdThunk,
  loadFinancierBasicInfoByIdThunk,
  loadSellerBankDetailsByIdThunk,
  loadSellerBasicInfoByIdThunk,
  supplierListThunk,
} from "../thunk/user.thunk";

const initialState = {
  isLoading: false,
  list: [],
  error: {},
  refresh: false,
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(adminListThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(adminListThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.list = action?.payload?.data?.result || [];
      })
      .addCase(adminListThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(supplierListThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(supplierListThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.list = action?.payload?.data?.result || [];
      })
      .addCase(supplierListThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(consumerListThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(consumerListThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.list = action?.payload?.data?.result || [];
      })
      .addCase(consumerListThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(financierListThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(financierListThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.list = action?.payload?.data?.result || [];
      })
      .addCase(financierListThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(loadAdminBasicInfoByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        loadAdminBasicInfoByIdThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
          state.error = action?.payload;
        }
      )
      .addCase(loadAdminBasicInfoByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(loadSellerBasicInfoByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        loadSellerBasicInfoByIdThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
          state.error = action?.payload;
        }
      )
      .addCase(loadSellerBasicInfoByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(loadConsumerBasicInfoByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        loadConsumerBasicInfoByIdThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
          state.error = action?.payload;
        }
      )
      .addCase(loadConsumerBasicInfoByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(loadFinancierBasicInfoByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        loadFinancierBasicInfoByIdThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
          state.error = action?.payload;
        }
      )
      .addCase(loadFinancierBasicInfoByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(loadSellerBankDetailsByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        loadSellerBankDetailsByIdThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
          state.error = action?.payload;
        }
      )
      .addCase(loadSellerBankDetailsByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });

    builder
      .addCase(fetchSellerVerificationByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        fetchSellerVerificationByIdThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
          state.error = action?.payload;
        }
      )
      .addCase(fetchSellerVerificationByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchSellerDocumentsByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        fetchSellerDocumentsByIdThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
          state.error = action?.payload;
        }
      )
      .addCase(fetchSellerDocumentsByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    
  },
});

export const { resetList } = user.actions;

export default user.reducer;
