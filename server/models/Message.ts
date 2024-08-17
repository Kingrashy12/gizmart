import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    chatId: { type: String, required: true },
    senderId: { type: String, required: true },
    message: { type: String },
    images: { type: Array, default: [] },
    seen: { type: Boolean, default: false },
    reaction: { type: String },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("Messages", MessageSchema);

export default MessageModel;
