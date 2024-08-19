import { get_vouchers } from "@/helper/fetch.action";
import { validate_voucher } from "@/helper/patch.action";
import { generate_voucher } from "@/helper/post.action";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const generateVoucher = createAsyncThunk(
  "voucher/generate",
  async ({ ...data }: VoucherGenerationtype, { rejectWithValue }) => {
    try {
      const voucher = await generate_voucher(data);
      return voucher;
    } catch (error: any) {
      console.log(error.response.data);
      toast.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const ApplyVoucher = createAsyncThunk(
  "voucher/validate",
  async ({ ...data }: ValidateVoucherType, { rejectWithValue }) => {
    try {
      const discountedPrice = await validate_voucher(data);
      return discountedPrice;
    } catch (error: any) {
      console.log(error.response.data);
      toast.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getVouchers = createAsyncThunk(
  "voucher/all",
  async (userId: string, { rejectWithValue }) => {
    try {
      const vouchers = await get_vouchers(userId);
      return vouchers;
    } catch (error: any) {
      console.log(error.response.data);
      toast.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
