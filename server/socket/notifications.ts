import { Server } from "socket.io";
import NotificationModel from "../models/Notification";

export default function handleNotificationFetch(io: Server) {
  io.on("connection", (socket) => {
    socket.on("get_notification", async (userId) => {
      try {
        const notifications = await NotificationModel.find({ userId });
        const unread = notifications.filter((n) => !n.seen);
        socket.emit("unread_notifications", unread);
      } catch (error: any) {
        console.log("err fetching notification:", error.message);
        socket.emit("error", "error fetching notification");
      }
    });
  });
}

export function fetchNotifications(io: Server) {
  io.on("connection", (socket) => {
    socket.on("fetch_notification", async (userId) => {
      try {
        const notifications = await NotificationModel.find({ userId }).sort({
          createdAt: -1,
        });
        socket.emit("notifications", notifications);
      } catch (error: any) {
        console.log("err fetching notification:", error.message);
        socket.emit("error", "error fetching notification");
      }
    });
  });
}
