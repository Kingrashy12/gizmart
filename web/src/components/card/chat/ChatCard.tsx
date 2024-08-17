import MessageAlert from "@/components/indicator/MessageAlert";
import OnlineStatus from "@/components/indicator/OnlineStatus";
import { SOCKET_URL } from "@/constants";
import { fetchUnreadMessages, getUserById } from "@/helper/fetch.action";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { Flex, NotIcon, Paragraph, StaticImage } from "@/lib";
import { selectChat } from "@/redux/chatSlice";
import React, { useCallback, useEffect, useState } from "react";
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
  const [userData, setUserData] = useState<UserDataType>();
  const isactive = activeUser.some((user) => user.userId === userData?._id);
  const dispatch = useAppDispatch();
  const [unreadMessages, setUnreadMessages] = useState<MessageType[]>([]);
  const messageState = useAppSelector((state) => state.message.messages);
  const socket = io(SOCKET_URL);
  const chatMessage = messageState.find((m) => m.chatId === chat._id);
  const isSender = unreadMessages.some(
    (message) => message.senderId === userId
  );

  useEffect(() => {
    if (!chat._id) return;

    socket.emit("get_unread_messages", chat._id);
    const handleUnread = (unreadMessages: MessageType[]) => {
      setUnreadMessages(unreadMessages);
    };

    // console.log("fetching unread");
    socket.on("fetch_unread", handleUnread);
    return () => {
      socket.off("fetch_unread", handleUnread);
    };
  }, [chat._id, unreadMessages]);

  useEffect(() => {
    const getUsersInChat = async () => {
      const user_Id = chat.members?.find((id) => id !== userId);
      if (user_Id) {
        const user = await getUserById(user_Id);
        setUserData(user);
      } else {
        toast.error("Error decoding users Id");
      }
    };
    getUsersInChat();
  }, [chat]);

  const chatInfo = {
    chat,
    user: userData,
  };

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
              src={userData?.profile.url}
              width={50}
              height={50}
              className="rounded-full border-2"
            />
          </div>
          <Paragraph fontPoppins className="font-medium text-lg">
            {userData?.name}
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
