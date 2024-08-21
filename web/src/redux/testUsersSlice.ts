import { createSlice } from "@reduxjs/toolkit";

const initialState: TestUserStateType = {
  users: [],
  fetchStatus: "",
  fetchError: "",
  addStatus: "",
  addError: "",
};

const testUserSlice = createSlice({
  name: "test-users",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

export default testUserSlice.reducer;
