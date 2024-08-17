import { createSlice } from "@reduxjs/toolkit";
import { fetchSeller } from "./thunks/user";

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
  fetch_seller_status: "",
  fetch_seller_error: "",
  fetchStatus: "",
  fetchError: "",
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
  },
});

export default userSlice.reducer;
