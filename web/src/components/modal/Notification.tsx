import React from "react";
import { alertClass } from "./class";
import { useNotificationModal } from "@/context/useNotification";
import { Flex, HeaderOne, Paragraph } from "@/lib";
import { IoArrowBack } from "react-icons/io5";
import { useAppSelector } from "@/hooks/store";
import Header from "../notification/Header";
import { formatToWeek } from "@/utils";
import NotificationCard from "../notification/NotificationCard";

const Notification = () => {
  const { onClose, onOpen } = useNotificationModal();
  const notifications = useAppSelector(
    (state) => state.notification.notifications
  );

  const groupedNotifications = notifications.reduce<
    Record<string, NotificationType[]>
  >((acc, notification) => {
    const date = new Date(notification.createdAt).toDateString(); // Convert to a readable date string
    if (!acc[date]) acc[date] = []; // Initialize the array if it doesn't exist
    acc[date].push(notification); // Push the notification to the relevant date group
    return acc;
  }, {});

  return (
    <div className="inset-0 w-full h-full fixed z-[500]" onClick={onClose}>
      <div className={alertClass} onClick={(e) => e.stopPropagation()}>
        <Header onClose={onClose} />
        <Flex className="flex-col gap-6 overflow-y-auto h-[400px] max-[550px]:h-full">
          {Object.entries(groupedNotifications).map(
            ([date, notificationsForDate]) => (
              <div key={date}>
                <Paragraph
                  fontInter
                  className="font-normal text-sm text-neutral-500 p-3"
                >
                  {formatToWeek(new Date(date))}
                </Paragraph>
                <Flex className="flex-col gap-3">
                  {notificationsForDate.map((notification, index) => (
                    <NotificationCard key={index} notification={notification} />
                  ))}
                </Flex>
              </div>
            )
          )}
        </Flex>
      </div>
    </div>
  );
};

export default Notification;
