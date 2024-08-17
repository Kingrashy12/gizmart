import { Flex, HeaderOne, Paragraph } from "@/lib";
import React from "react";
import TypeCard from "./TypeCard";
import { formatDateBy } from "@/utils";

const NotificationCard: React.FC<{ notification: NotificationType }> = ({
  notification,
}) => {
  return (
    <Flex
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
