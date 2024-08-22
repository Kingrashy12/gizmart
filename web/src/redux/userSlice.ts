import { createSlice } from "@reduxjs/toolkit";
import { addDemoUser, fetchSeller, getDemoAccounts } from "./thunks/user";
import toast from "react-hot-toast";

const initialState: UserStateType = {
  seller: {
    user: {
      _id: "",
      name: "",
      email: "",
      slug: "",
      number: 0,
      isAdmin: false,
      isSeller: false,
      isVerified: false,
      isNumberVerified: false,
      profile: "",
      createdAt: "",
      products: [],
    },
    products: [],
  },
  users: [],
  demo_accounts: [],
  fetch_seller_status: "",
  fetch_seller_error: "",
  fetchStatus: "",
  fetchError: "",
  addStatus: "",
  addError: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchSeller.pending, (state, action) => {
      return { ...state, fetch_seller_status: "pending" };
    });
    builder.addCase(fetchSeller.fulfilled, (state, action) => {
      return {
        ...state,
        fetch_seller_status: "successful",
        seller: action.payload,
      };
    });
    builder.addCase(fetchSeller.rejected, (state, action) => {
      return {
        ...state,
        fetch_seller_status: "failed",
        fetch_seller_error: action.payload,
      };
    });
    builder.addCase(addDemoUser.pending, (state) => {
      return { ...state, addStatus: "pending" };
    });
    builder.addCase(addDemoUser.fulfilled, (state, action) => {
      toast.success(action.payload?.message);
      const updatedUsers = [action.payload, ...state.demo_accounts];
      return { ...state, addStatus: "successful", demo_accounts: updatedUsers };
    });
    builder.addCase(addDemoUser.rejected, (state, action) => {
      return { ...state, addError: action.payload, addStatus: "failed" };
    });
    builder.addCase(getDemoAccounts.pending, (state) => {
      // toast.loading("Fetching demo accounts...", { id: "demo_fetch" });
    });
    builder.addCase(getDemoAccounts.fulfilled, (state, action) => {
      return { ...state, demo_accounts: action.payload };
    });
    builder.addCase(getDemoAccounts.rejected, (state, action) => {
      console.log("Installation failed", action.payload);
    });
  },
});

export default userSlice.reducer;
