import { useEditMessage } from "@/context/useEditMessage";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { Divider, Flex, HeightDivider, Paragraph } from "@/lib";
import { selectMessageToEdit } from "@/redux/messageSlice";
import React from "react";
import OptionIcon from "./custom/OptionIcon";
import { deleteMessage } from "@/redux/thunks/message";

type OptionsProp = {
  Message: MessageType;
  userId: string;
  closeOption: () => void;
};

const Options = ({ Message, userId, closeOption }: OptionsProp) => {
  const { message, senderId, _id } = Message;
  const dispatch = useAppDispatch();
  const { onOpen } = useEditMessage();
  const messageState = useAppSelector((state) => state.message);
  const current = messageState.actionMessage;

  const handleReply = () => {
    closeOption();
  };

  const handleReaction = () => {
    closeOption();
  };

  const handleEdit = () => {
    dispatch(selectMessageToEdit(Message));
    closeOption();
    onOpen();
  };

  const handleDelete = () => {
    dispatch(selectMessageToEdit(Message));
    if (current._id) {
      closeOption();
      dispatch(deleteMessage({ messageId: current._id, userId }));
    }
  };

  return (
    <div
      className={`w-auto items-center flex gap-2 z-[9999] -top-[3rem] ${
        senderId === userId ? "right-0" : ""
      } bg-white drop-shadow p-1 rounded-lg absolute`}
    >
      <OptionIcon
        type="edit"
        senderId={senderId}
        userId={userId}
        onClick={handleEdit}
      />
      <OptionIcon
        type="reply"
        senderId={senderId}
        userId={userId}
        onClick={handleReply}
      />
      <OptionIcon
        type="react-to"
        senderId={senderId}
        userId={userId}
        onClick={handleReaction}
      />
      <HeightDivider
        className={senderId !== userId ? "hidden" : "flex h-5 border-r w-1"}
      />
      <OptionIcon
        type="delete"
        senderId={senderId}
        userId={userId}
        onClick={handleDelete}
      />
    </div>
  );
};

export default Options;

{
  /* <TbEdit
    size={35}
    onClick={handleEdit}
    className={`items-center ${
      senderId !== userId ? "hidden" : "flex"
    } text-black gap-2 p-2 hover:bg-neutral-100 cursor-pointer rounded-lg`}
  /> */
}

{
  /* <BiReplyAll
    size={35}
    
  /> */
}
{
  /* <MdOutlineAddReaction
    size={35}
    className={`items-center text-black gap-2 p-2 hover:bg-neutral-100 cursor-pointer rounded-lg`}
  /> */
}
{
  /* <TbTrash
    onClick={handleDelete}
    size={35}
    className={`items-center text-black ${
      senderId !== userId ? "hidden" : "flex"
    } gap-2 p-2 hover:bg-neutral-100 cursor-pointer rounded-lg`}
  /> */
}
