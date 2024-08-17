import { Divider, Flex, HeaderOne, Paragraph } from "@/lib";
import { TextInput } from "@tremor/react";
import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import ChatCard from "../card/chat/ChatCard";
import { useRouter } from "next/router";
import { HiMiniArrowLeft } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { ContainerClass } from "./class";
import { clearOnExits } from "@/redux/messageSlice";
import { removeChat } from "@/redux/chatSlice";

interface ChatsProps {
  chats: ChatType[];
  isLoading: boolean;
  userId: string;
  activeUser: any[];
}

const Container = ({ chats, isLoading, userId, activeUser }: ChatsProps) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const chatState = useAppSelector((state) => state.chat.selectedChat);
  const dispatch = useAppDispatch();

  function goBack() {
    dispatch(removeChat());
    dispatch(clearOnExits());
    router.back();
  }
  return (
    <div
      className={`${ContainerClass} ${
        chatState.chat._id ? "max-[550px]:hidden" : "max-[550px]:flex"
      }`}
    >
      <Flex className="items-center px-5 mt-3 gap-2">
        <HiMiniArrowLeft
          size={35}
          onClick={goBack}
          className="p-2 rounded-md hover:bg-neutral-100 cursor-pointer"
        />
        <HeaderOne fontPoppins className="font-semibold text-xl">
          Chats
        </HeaderOne>
      </Flex>
      {chats.length >= 1 ? (
        <>
          <Divider />
          <div className="p-2">
            <TextInput placeholder="Search chat" icon={RiSearchLine} />
          </div>
          <Divider />
        </>
      ) : (
        <Divider />
      )}
      <Flex
        className={isLoading ? "hidden" : "flex-col gap-3 overflow-y-auto px-2"}
      >
        {chats?.length < 1 ? (
          <Paragraph
            fontPoppins
            className="font-medium text-center text-neutral-400/"
          >
            Your chat list is empty. Start a conversation today!
          </Paragraph>
        ) : (
          chats.map((chat, index) => (
            <ChatCard
              key={index}
              chat={chat}
              userId={userId}
              activeUser={activeUser}
            />
          ))
        )}
      </Flex>
    </div>
  );
};

export default Container;
