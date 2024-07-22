import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
  token: "",
  userId: "",
  name: "",
  username: "",
  email: "",
  profile: "",
  number: "",
  accountType: "",
  loginStatus: "",
  loginError: "",
  registerStatus: "",
  registerError: "",
  userLoaded: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

export default AuthSlice.reducer;
