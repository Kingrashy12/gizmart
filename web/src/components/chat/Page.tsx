import { Flex } from "@/lib";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Container from "./Container";
import Inbox from "./Inbox";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { useBackgroundLoader } from "@/context/useBackgroundLoader";
import { getChats } from "@/redux/thunks/chats";
import io from "socket.io-client";
import { SOCKET_URL } from "@/constants";
import { updatedChats } from "@/redux/chatSlice";
import { extractUser } from "@/utils";

const Page = () => {
  const dispatch = useAppDispatch();
  const chatState = useAppSelector((state) => state.chat);
  const chatLoading = chatState.fetchStatus === "pending";
  const user = useAppSelector((state) => state.auth);
  const userId = user.userId;
  const socket = io(SOCKET_URL);
  const Chats = chatState?.chats;
  const socketRef = useRef<any>(undefined);
  const [activeUsers, setActiveUsers] = useState([]);
  const User = extractUser(user);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);
    socketRef.current.emit("add-new-user", userId);
    socketRef.current.on("get-users", (users: any) => {
      setActiveUsers(users);
    });

    return () => {
      socketRef.current.off("get-users", userId);
    };
  }, [chatState.chats]);

  const { onOpen, onClose } = useBackgroundLoader();

  useEffect(() => {
    dispatch(getChats(userId));
  }, []);

  const handleNewChat = useCallback(
    (chat: ChatType) => {
      if (chat.members.includes(User)) {
        dispatch(updatedChats([chat, ...chatState.chats]));
        console.log("chats:", chat);
      } else console.log("Err");
    },
    [chatState.chats, dispatch]
  );

  useEffect(() => {
    socket.on("new_chat", handleNewChat);

    return () => {
      socket.off("new_chat", handleNewChat);
    };
  }, [handleNewChat]);

  useEffect(() => {
    if (chatLoading) {
      onOpen();
    } else {
      onClose();
    }
  }, [chatLoading]);

  return (
    <Flex className="gap- h-full z-0">
      <Container
        chats={Chats ? Chats : []}
        isLoading={chatLoading}
        userId={userId}
        activeUser={activeUsers}
      />
      <Inbox activeUser={activeUsers} />
    </Flex>
  );
};

export default Page;
