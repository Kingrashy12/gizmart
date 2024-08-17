import express from "express";
import {
  deleteMessage,
  editMessage,
  getMessages,
  getUnreadMessages,
  ReadMessage,
  sendMessage,
} from "../controllers/Message";

const MessageRoute = express.Router();

MessageRoute.post("/send", sendMessage);
// GET
MessageRoute.get("/all/:chatId", getMessages);
MessageRoute.get("/all/unread/:chatId", getUnreadMessages);
// PATCH
MessageRoute.patch("/read-all/:chatId", ReadMessage);
MessageRoute.patch("/one/edit", editMessage);
MessageRoute.patch("/one/delete", deleteMessage);

export default MessageRoute;
