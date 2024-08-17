import { fetchMessages } from "@/helper/fetch.action";
import { delete_message, edit_message } from "@/helper/patch.action";
import { SendMessage } from "@/helper/post.action";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const getMessages = createAsyncThunk(
  "message/all",
  async (chatId: string, { rejectWithValue }) => {
    try {
      const messages = await fetchMessages(chatId);
      return messages;
    } catch (error: any) {
      toast.error(error.response?.data);
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "message/send",
  async ({ ...form }: MessageForm, { rejectWithValue }) => {
    try {
      const message = await SendMessage(form);
      return message;
    } catch (error: any) {
      toast.error(error.response?.data);
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const editMessage = createAsyncThunk(
  "message/edit",
  async ({ ...form }: EditMessageBodyType, { rejectWithValue }) => {
    try {
      const message = await edit_message(form);
      return message;
    } catch (error: any) {
      toast.error(error.response?.data);
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteMessage = createAsyncThunk(
  "message/delete",
  async ({ ...data }: DeleteMessageType, { rejectWithValue }) => {
    try {
      const message = await delete_message(data);
      return message;
    } catch (error: any) {
      toast.error(error.response?.data, { id: "deleting_" });
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);