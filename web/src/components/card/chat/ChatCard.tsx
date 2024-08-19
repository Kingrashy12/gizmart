import MessageAlert from "@/components/indicator/MessageAlert";
import OnlineStatus from "@/components/indicator/OnlineStatus";
import { SOCKET_URL } from "@/constants";
import { getUserById } from "@/helper/fetch.action";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { Flex, Paragraph, StaticImage } from "@/lib";
import { selectChat } from "@/redux/chatSlice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import io from "socket.io-client";

interface ChatCardProps {
  chat: ChatType;
  userId: string;
  activeUser: any[];
}

export type UserDataType = {
  _id: string;
  name: string;
  isVerified: boolean;
  profile: any;
};

const ChatCard = ({ chat, userId, activeUser }: ChatCardProps) => {
  const [userData, setUserData] = useState<ChatMemberType>();
  const isactive = activeUser.some((user) => user.userId === userData?._id);
  const dispatch = useAppDispatch();
  const [unreadMessages, setUnreadMessages] = useState<MessageType[]>([]);
  const socket = io(SOCKET_URL);
  const [lastMessage, setLastMessage] = useState<MessageType>();
  const isSender = unreadMessages.some(
    (message) => message.senderId === userId
  );

  useEffect(() => {
    if (!chat._id) return;

    socket.emit("get_unread_messages", chat._id);
    const handleUnread = (unreadMessages: MessageType[]) => {
      setUnreadMessages(unreadMessages);
    };

    socket.on("fetch_unread", handleUnread);
    return () => {
      socket.off("fetch_unread", handleUnread);
    };
  }, [chat._id, unreadMessages]);

  useEffect(() => {
    const user = chat.members.find((u) => u._id !== userId);
    setUserData(user);
  }, [chat]);

  useEffect(() => {
    if (!chat._id) return;
    socket.emit("get_last_message", chat._id);
    const handleLastMessage = (lastMessage: MessageType, chatId: string) => {
      if (chatId === chat._id) {
        setLastMessage(lastMessage);
      }
    };

    socket.on("last_message", handleLastMessage);

    return () => {
      socket.off("last_message", handleLastMessage);
    };
  }, [lastMessage]);

  const chatInfo = {
    chat,
    user: userData,
  };

  const currentWidth = global?.window?.innerWidth;
  const md = currentWidth <= 550;
  const name = userData?.name;
  const lg_name =
    name?.length && name.length > 15
      ? userData?.name.slice(0, 15) + "..."
      : name;
  const truncate_name = md ? name : lg_name;

  return (
    <>
      {userData ? (
        <Flex
          className={`items-center ${
            userData ? "flex" : "hidden"
          } gap-3 cursor-pointer hover:bg-neutral-100 p-2 rounded-lg`}
          onClick={() => dispatch(selectChat(chatInfo))}
        >
          <div className="flex flex-col relative">
            <OnlineStatus isOnline={isactive} isOffline={!isactive} />
            <StaticImage
              alt={userData?.name}
              src={userData?.profile?.url}
              width={45}
              height={45}
              className="rounded-full border-2"
            />
          </div>
          <Paragraph fontPoppins className="font-medium text-sm">
            {truncate_name}
          </Paragraph>
          <Paragraph
            fontInter
            className="font-medium text-sm text-gray-400 max-w-[90%] truncate max-[1024px]:hiddin max-[550px]:flex"
          >
            {lastMessage?.message}
          </Paragraph>
          <MessageAlert
            alert={unreadMessages.length}
            className={isSender ? "hidden" : "flex"}
          />
        </Flex>
      ) : (
        <AiOutlineLoading3Quarters
          size={30}
          className="spinner text-primaryColor text-center justify-center flex"
        />
      )}
    </>
  );
};

export default ChatCard;
