import { createSlice } from "@reduxjs/toolkit";

const initialState: NotificationStateType = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    updateNotification: (state, action) => {
      state.notifications = action.payload;
    },
  },
  extraReducers(builder) {},
});

export default notificationSlice.reducer;
export const { updateNotification } = notificationSlice.actions;
