import express from "express";
import { createChat, fetchUserChats, findUserChat } from "../controllers/Chat";

const ChatsRoute = express.Router();

ChatsRoute.post("/create", createChat);
// GET
ChatsRoute.get("/all/:userId", fetchUserChats);
ChatsRoute.get("/one/:chatId", findUserChat);

export default ChatsRoute;
