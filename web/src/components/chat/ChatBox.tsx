import { getUserById } from "@/helper/fetch.action";
import { Flex } from "@/lib";
import React, { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Header from "./messages/Header";
import Messages from "./messages/Messages";
import MessageBox from "./messages/MessageBox";
import { UserDataType } from "../card/chat/ChatCard";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { getMessages } from "@/redux/thunks/message";
import { useBackgroundLoader } from "@/context/useBackgroundLoader";
import io from "socket.io-client";
import { addNewMessage } from "@/redux/messageSlice";
import { SOCKET_URL } from "@/constants";
import Menu from "./Menu";

interface ChatBoxProps {
  chat: ChatType;
  userData: UserDataType;
  activeUser: any[];
}

const ChatBox = ({ chat, userData, activeUser }: ChatBoxProps) => {
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const dispatch = useAppDispatch();
  const messageState = useAppSelector((state) => state.message);
  const messageFetching = messageState.fetchStatus === "pending";
  const { onClose, onOpen } = useBackgroundLoader();
  const audioRef = useRef<HTMLAudioElement>(null);
  const userId = useAppSelector((state) => state.auth.userId);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    dispatch(getMessages(chat._id));
  }, [userData]);

  useEffect(() => {
    if (messageFetching) {
      onOpen();
    } else {
      onClose();
    }
  }, [messageFetching]);

  const handleMessage = useCallback(
    (newMessage: MessageType, chatId: string) => {
      if (chatId === chat._id) {
        if (newMessage.senderId !== userId && audioRef.current) {
          audioRef.current.play();
        }

        dispatch(addNewMessage(newMessage));
      } else console.log("Not authorized to view other people's message");
    },
    [dispatch, chat._id]
  );

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socket.on("new_message", handleMessage);

    return () => {
      socket.off("new_message", handleMessage);
    };
  }, [handleMessage]);

  return (
    <Flex
      className="flex-col justify-between h-screen z-auto"
      onClick={() => setOpenMenu(false)}
    >
      <Header
        openMenu={() => setOpenMenu(true)}
        user={userData}
        activeUser={activeUser}
      />
      {openMenu && <Menu closeMenu={() => setOpenMenu(false)} />}
      <Messages chat={chat} setIsEmojiOpen={setIsEmojiOpen} />
      <audio src="new.wav" ref={audioRef} />
      <MessageBox
        chat={chat}
        isEmojiOpen={isEmojiOpen}
        setIsEmojiOpen={setIsEmojiOpen}
      />
    </Flex>
  );
};

export default ChatBox;
