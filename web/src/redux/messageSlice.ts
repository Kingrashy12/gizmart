import { createSlice } from "@reduxjs/toolkit";
import {
  deleteMessage,
  editMessage,
  getMessages,
  sendMessage,
} from "./thunks/message";
import toast from "react-hot-toast";

const initialState: MessageStateType = {
  messages: [],
  actionMessage: {
    _id: "",
    message: "",
    senderId: "",
    images: [],
    seen: false,
    chatId: "",
    createdAt: "",
  },
  fetchStatus: "",
  fetchError: "",
  sendStatus: "",
  sendError: "",
  onReply: false,
  onEdit: false,
  onReact: false,
  editStatus: "",
  editError: "",
  replyStatus: "",
  replyError: "",
  deleteStatus: "",
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addNewMessage: (state, action) => {
      const updatedMessage = [...state.messages, action.payload];
      state.messages = updatedMessage;
    },
    clearOnExits: (state) => {
      state.messages = [];
    },
    selectMessageToEdit: (state, action) => {
      state.onEdit = true;
      state.actionMessage = action.payload;
    },
    selectMessageToReply: (state, action) => {
      state.onReply = true;
      state.actionMessage = action.payload;
    },
    removeAction: (state) => {
      state.onEdit = false;
      state.onReply = false;
      state.actionMessage = {
        _id: "",
        message: "",
        senderId: "",
        images: [],
        seen: false,
        chatId: "",
        createdAt: "",
      };
    },
    replace_message: (state, action) => {
      const queried = state.messages.find(
        (message) => message._id === action.payload._id
      );
      if (queried) {
        queried.message = action.payload.message;
      }
    },
    deleteFromState: (state, action) => {
      const updatedMessage = state.messages.filter(
        (message) => message._id !== action.payload._id
      );
      state.messages = updatedMessage;
    },
  },
  extraReducers(builder) {
    builder.addCase(getMessages.pending, (state) => {
      return { ...state, fetchStatus: "pending" };
    });
    builder.addCase(getMessages.fulfilled, (state, action) => {
      return { ...state, fetchStatus: "successful", messages: action.payload };
    });
    builder.addCase(getMessages.rejected, (state, action) => {
      return { ...state, fetchStatus: "failed", fetchError: action.payload };
    });
    builder.addCase(sendMessage.pending, (state) => {
      return { ...state, sendStatus: "pending" };
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      // const updatedMessage = [...state.messages, action.payload];
      toast.success("Message sent");
      return { ...state, sendStatus: "successful" };
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      return { ...state, sendError: action.payload, sendStatus: "failed" };
    });
    builder.addCase(editMessage.pending, (state) => {
      return { ...state, editStatus: "pending" };
    });
    builder.addCase(editMessage.fulfilled, (state, action) => {
      toast.success("Message edited");
      return { ...state, editStatus: "successful" };
    });
    builder.addCase(editMessage.rejected, (state, action) => {
      return { ...state, editError: action.payload, editStatus: "failed" };
    });
    builder.addCase(deleteMessage.pending, (state) => {
      toast.loading("Deleting message", { id: "deleting_" });
    });
    builder.addCase(deleteMessage.fulfilled, (state, action) => {
      toast.success("Message deleted", { id: "deleting_" });
    });
    builder.addCase(deleteMessage.rejected, (state, action) => {
      console.log(`Err:`, action.payload);
    });
  },
});

export default messageSlice.reducer;

export const {
  addNewMessage,
  clearOnExits,
  selectMessageToEdit,
  selectMessageToReply,
  removeAction,
  replace_message,
  deleteFromState,
} = messageSlice.actions;
