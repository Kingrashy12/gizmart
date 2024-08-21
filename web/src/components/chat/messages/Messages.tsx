import { useAppSelector } from "@/hooks/store";
import { Flex, HeaderOne, Paragraph } from "@/lib";
import React, {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
} from "react";
import MessageItem from "./MessageItem";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

interface MessagesProps {
  chat: ChatType;
  setIsEmojiOpen: Dispatch<SetStateAction<boolean>>;
}

const Messages = ({ chat, setIsEmojiOpen }: MessagesProps) => {
  const currentChat = useAppSelector((state) => state.chat.selectedChat.user);
  const messages = useAppSelector((state) => state.message.messages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollIcon, setShowScrollIcon] = useState(false);

  const handleScroll = () => {
    const container = chatContainerRef.current;
    const isNearBottom =
      container &&
      container?.scrollHeight - container?.scrollTop <=
        container?.clientHeight + 200;
    setShowScrollIcon(!isNearBottom);
  };

  // Attach scroll event listener
  useEffect(() => {
    const container = chatContainerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);

  function scrollToBottom() {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <div
      ref={chatContainerRef}
      className="p-4 bg-white overflow-y-auto h-full max-[550px]:h-[85vh] max-[550px]:mt-20 flex-col z-[1] gap-3 flex w-full relative"
      onClick={() => setIsEmojiOpen(false)}
    >
      {messages.length < 1 ? (
        <Flex className="flex-col gap-1 items-center justify-center h-full">
          <HeaderOne fontPoppins className="font-medium text-lg items-center">
            No message yet!
          </HeaderOne>
          <Paragraph fontRoboto className="font-normal text-neutral-400">
            Send a new message to <strong>{currentChat.name}</strong>
          </Paragraph>
        </Flex>
      ) : (
        messages.map((message, index) => (
          <MessageItem key={index} Message={message} />
        ))
      )}
      <div
        onClick={scrollToBottom}
        className={`${
          showScrollIcon ? "flex" : "hidden"
        } items-center justify-center fixed bg-white rounded-full w-10 h-10 drop-shadow bottom-20 right-7 hover:opacity-75`}
      >
        <MdOutlineKeyboardArrowDown
          size={25}
          className="text-black cursor-pointer"
        />
      </div>
      <div ref={bottomRef}></div>
    </div>
  );
};

export default Messages;
