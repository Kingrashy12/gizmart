import { ReadMessages } from "@/helper/patch.action";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { Paragraph } from "@/lib";
import { formatTime } from "@/utils";
import React, { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Options from "./Options";
import { SOCKET_URL } from "@/constants";
import io from "socket.io-client";
import { deleteFromState, replace_message } from "@/redux/messageSlice";
import Message_Images from "./Message_Images";
import ViewImage from "./ViewImage";

interface MessageProps {
  Message: MessageType;
}

const MessageItem = ({ Message }: MessageProps) => {
  const { senderId, message, chatId, images, createdAt, seen, _id } = Message;
  const userId = useAppSelector((state) => state.auth.userId);
  const messages = useAppSelector((state) => state.message.messages);
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [openOptions, setOpenOptions] = useState(false);
  const [viewImage, setViewImage] = useState(false);
  const dispatch = useAppDispatch();

  const msgRef = useRef<HTMLDivElement>(null);

  const handleMessageEdit = useCallback(
    (updatedMessage: MessageType, messageId: string) => {
      if (messageId === _id) {
        dispatch(replace_message(updatedMessage));
      } else console.log("can't update this message");
    },
    [dispatch]
  );

  const handleMessageUpdate = useCallback(
    (message: MessageType, messageId: string) => {
      if (messageId === _id) {
        dispatch(deleteFromState(message));
      } else console.log("can't delete this message");
    },
    [dispatch]
  );

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socket.on("updated_message", handleMessageEdit);

    return () => {
      socket.off("updated_message", handleMessageEdit);
    };
  }, [handleMessageEdit]);

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socket.on("updated_message", handleMessageUpdate);

    return () => {
      socket.off("updated_message", handleMessageUpdate);
    };
  }, [handleMessageUpdate]);

  const handleRead = useCallback(async () => {
    await ReadMessages(chatId);
  }, [messages, chatId]);

  useEffect(() => {
    if (senderId !== userId) {
      handleRead();
    }
  }, [message, chatId]);

  useEffect(() => {
    msgRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (msgRef.current && !msgRef.current.contains(event.target as Node)) {
        setOpenOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function onKeyAction(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    event.stopPropagation();
    setOpenOptions(true);
  }

  function view_image(index: number) {
    setCurrentImage(images[index]);
    setViewImage(true);
  }

  return (
    <div
      onContextMenu={onKeyAction}
      ref={msgRef}
      className={`flex flex-col relative p-[5.5px] z-0 max-w-[300px] text-[#000000] ${
        senderId === userId
          ? "self-end bg-[#D0EAFB] sender"
          : "self-start bg-[#F0F0F0] receiver"
      }`}
    >
      {images.length >= 1 && (
        <Message_Images
          Message={Message}
          userId={userId}
          viewImage={view_image}
        />
      )}
      <Paragraph className="px-2 font-medium select-none" fontRoboto>
        {message}
      </Paragraph>

      <Paragraph
        fontRoboto
        className={`text-[11px] select-none ${
          !message && "absolute right-[10px] bottom-2"
        } self-end font-normal text-neutral-500`}
      >
        {formatTime(createdAt, "h:m a")}
      </Paragraph>
      {openOptions && (
        <Options
          userId={userId}
          Message={Message}
          closeOption={() => setOpenOptions(false)}
        />
      )}
      <ViewImage
        isOpen={viewImage}
        closeView={() => setViewImage(false)}
        images={images}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
      />
    </div>
  );
};

export default MessageItem;
