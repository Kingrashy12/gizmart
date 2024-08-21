import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import connectDB from "./utils/connectDB";
import AuthRoute from "./routes/Auth";
import bodyParser from "body-parser";
import cors from "cors";
import UserRoute from "./routes/User";
import cookieParser from "cookie-parser";
import ProductRoute from "./routes/Product";
import VoucherRoute from "./routes/Voucher";
import ChatsRoute from "./routes/Chat";
import MessageRoute from "./routes/Message";
import { Server } from "socket.io";
import http from "http";
import OrderRoute from "./routes/Order";
import compression from "compression";
import handleMessageSocket from "./socket/message";
import handleNotificationFetch, {
  fetchNotifications,
  readNotification,
} from "./socket/notifications";
import { generateNumber } from "./utils/generateCode";
import handleUserStatus from "./socket/chats";
import MessageModel from "./models/Message";
import DemoAccountRoute from "./routes/Demo_User";
// import { createClient } from "redis";

dotenv.config();
const server = express();
const port = process.env.PORT;
const httpServer = http.createServer(server);
export const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://gizmart.vercel.app"],
  },
});

const corsOptions = {
  origin: ["https://gizmart.vercel.app", "http://localhost:3000"],
  optionsSuccessStatus: 200,
};

server.use(cors(corsOptions));
server.use(express.json({ limit: "80mb" }));
server.use(cookieParser());
server.use(compression({ threshold: 1024 }));
server.use(bodyParser.json({ limit: "80mb" }));
server.use(bodyParser.urlencoded({ limit: "80mb", extended: true }));

httpServer.listen(port, () =>
  console.log(`Server running on http://localhost:${port}/v1`)
);

handleMessageSocket(io);
handleNotificationFetch(io);
handleUserStatus(io);
fetchNotifications(io);
readNotification(io);

server.use("/v1/auth", AuthRoute);
server.use("/v1/user", UserRoute);
server.use("/v1/products", ProductRoute);
server.use("/v1/order", OrderRoute);
server.use("/v1/voucher", VoucherRoute);
server.use("/v1/chats", ChatsRoute);
server.use("/v1/messages", MessageRoute);
server.use("/v1/demo/account", DemoAccountRoute);

server.get("/v1", (req, res) => {
  res.send("Welcome on board");
  console.log("welcome onboard");
});

connectDB();
