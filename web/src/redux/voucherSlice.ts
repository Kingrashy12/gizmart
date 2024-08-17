import { createSlice } from "@reduxjs/toolkit";
import { ApplyVoucher, generateVoucher } from "./thunks/voucher";
import toast from "react-hot-toast";

const initialState: VoucherStateType = {
  _all: [],
  vouchers: [],
  generate_status: "",
  generate_error: "",
  _all_fetchStatus: "",
  _allfetchError: "",
  fetchStatus: "",
  fetchError: "",
  validateStatus: "",
  validateError: "",
  discountedPrice: 0,
  applied: "",
};

const voucherSlice = createSlice({
  name: "voucher",
  initialState,
  reducers: {
    clearDiscount: (state) => {
      state.discountedPrice = 0;
    },
  },
  extraReducers(builder) {
    builder.addCase(generateVoucher.pending, (state) => {
      return { ...state, generate_status: "pending" };
    });
    builder.addCase(generateVoucher.fulfilled, (state, action) => {
      toast.success("Voucher successfully generated");
      const updatedVoucher = [action.payload, ...state._all];
      return { ...state, generate_status: "successful", _all: updatedVoucher };
    });
    builder.addCase(generateVoucher.rejected, (state, action) => {
      return {
        ...state,
        generate_error: action.payload,
        generate_status: "failed",
      };
    });
    builder.addCase(ApplyVoucher.pending, (state) => {
      return { ...state, validateStatus: "pending" };
    });
    builder.addCase(ApplyVoucher.fulfilled, (state, action) => {
      toast.success("Voucher successfully applied");
      return {
        ...state,
        validateStatus: "successful",
        discountedPrice: action.payload.discountedPrice,
        applied: action.payload.code,
      };
    });
    builder.addCase(ApplyVoucher.rejected, (state, action) => {
      return {
        ...state,
        validateError: action.payload,
        validateStatus: "failed",
      };
    });
  },
});

export default voucherSlice.reducer;
export const { clearDiscount } = voucherSlice.actions;
