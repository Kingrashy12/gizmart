import { useAppSelector } from "@/hooks/store";
import { Paragraph } from "@/lib";
import React from "react";
import ChatBox from "./ChatBox";
import { InboxClass } from "./class";

const Inbox: React.FC<{ activeUser: any[] }> = ({ activeUser }) => {
  const chatState = useAppSelector((state) => state.chat);
  const user = useAppSelector((state) => state.auth);

  return (
    <div
      className={`${InboxClass} max-[550px]:h-full relative z-0 ${
        chatState.selectedChat.chat._id
          ? "max-[550px]:flex"
          : "max-[550px]:hidden"
      }`}
    >
      {chatState.selectedChat.chat._id ? (
        <ChatBox
          chat={chatState.selectedChat.chat}
          userData={chatState.selectedChat.user}
          activeUser={activeUser}
        />
      ) : (
        <Paragraph
          fontPoppins
          className={`font-medium text-base text-neutral-500 text-center max-[550px]:hidden`}
        >
          Select a conversation to continue
        </Paragraph>
      )}
    </div>
  );
};

export default Inbox;
