import React from "react";
import { BiReplyAll } from "react-icons/bi";
import { MdOutlineAddReaction } from "react-icons/md";
import { TbEdit, TbTrash } from "react-icons/tb";
import CustomIcon from "@/components/icons/CustomIcon";

interface OptionIconsProps {
  type: "edit" | "react-to" | "delete" | "reply";
  senderId: string;
  userId: string;
  onClick: () => void;
}

const getIcon = (
  type: OptionIconsProps["type"],
  senderId: OptionIconsProps["senderId"],
  userId: OptionIconsProps["userId"],
  onClick: OptionIconsProps["onClick"]
) => {
  switch (type) {
    case "edit":
      return (
        <CustomIcon
          title="Edit"
          hasTitle
          titleClass="-bottom-11"
          icon={TbEdit}
          onClick={onClick}
          iconSize="md"
          iconClass={`items-center text-black ${
            senderId !== userId ? "hidden" : "flex"
          } text-black gap-2 p-2 hover:bg-neutral-100 cursor-pointer rounded-lg`}
        />
      );
    case "reply":
      return (
        <CustomIcon
          title="Reply"
          hasTitle
          titleClass="-bottom-11"
          icon={BiReplyAll}
          onClick={onClick}
          iconSize="md"
          iconClass={`items-center text-black gap-2 p-2 hover:bg-neutral-100 cursor-pointer rounded-lg`}
        />
      );
    case "react-to":
      return (
        <CustomIcon
          title="React"
          hasTitle
          titleClass="-bottom-11"
          icon={MdOutlineAddReaction}
          onClick={onClick}
          iconSize="md"
          iconClass={`items-center text-black gap-2 p-2 hover:bg-neutral-100 cursor-pointer rounded-lg`}
        />
      );
    case "delete":
      return (
        <CustomIcon
          title="Delete"
          hasTitle
          titleClass="-bottom-11"
          icon={TbTrash}
          onClick={onClick}
          iconSize="md"
          iconClass={`items-center text-black ${
            senderId !== userId ? "hidden" : "flex"
          } text-black gap-2 p-2 hover:bg-neutral-100 cursor-pointer rounded-lg`}
        />
      );
  }
};

const OptionIcon = ({ type, senderId, userId, onClick }: OptionIconsProps) => {
  return <>{getIcon(type, senderId, userId, onClick)}</>;
};

export default OptionIcon;
