import { Flex, HeaderOne, Paragraph } from "@/lib";
import React, { useCallback, useEffect } from "react";
import TypeCard from "./TypeCard";
import { formatDateBy } from "@/utils";
import io from "socket.io-client";
import { SOCKET_URL } from "@/constants";
import { useAppDispatch } from "@/hooks/store";
import { readNotification } from "@/redux/notificationSlice";

const NotificationCard: React.FC<{ notification: NotificationType }> = ({
  notification,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on("notification", (notification: NotificationType) => {
      if (notification._id === notification._id) {
        dispatch(readNotification(notification));
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch, notification._id]);

  const handleRead = useCallback(() => {
    const socket = io(SOCKET_URL);
    socket.emit("read_notification", notification._id);
  }, [notification._id]);

  return (
    <Flex
      onClick={handleRead}
      className={`p-3 gap-3 cursor-pointer ${
        notification.seen ? "" : "bg-blue-50"
      }`}
    >
      <TypeCard notification={notification} />
      <Flex className="flex-col gap-1">
        <HeaderOne fontPoppins className="font-semibold text-base">
          {notification.header}
        </HeaderOne>
        <Paragraph fontPoppins className="font-normal text-sm">
          {notification.body}
        </Paragraph>
      </Flex>
      <div className="flex flex-col gap-4 items-center">
        <Paragraph fontInter className="text-xs">
          {formatDateBy(new Date(notification.createdAt))}
        </Paragraph>
        {notification.seen ? null : (
          <div className="bg-primaryColor w-2 h-2 rounded-full p-1" />
        )}
      </div>
    </Flex>
  );
};

export default NotificationCard;
