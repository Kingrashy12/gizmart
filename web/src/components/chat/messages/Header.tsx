import { UserDataType } from "@/components/card/chat/ChatCard";
import { useAppDispatch } from "@/hooks/store";
import { Flex, FlexBetween, Paragraph } from "@/lib";
import { removeChat } from "@/redux/chatSlice";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";

import React from "react";
import { HiMiniArrowLeft } from "react-icons/hi2";
import { MdVerified } from "react-icons/md";
import { clearOnExits } from "@/redux/messageSlice";

interface HeaderProps {
  user: UserDataType;
  activeUser: any[];
  openMenu: () => void;
}

const Header = ({ user, activeUser, openMenu }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const isactive = activeUser.some((User) => User.userId === user._id);

  function exitsChat() {
    dispatch(removeChat());
    dispatch(clearOnExits());
  }

  function open(e: any) {
    e.stopPropagation();
    openMenu();
  }
  return (
    <FlexBetween className="bg-white p-3 border-b items-center">
      <Flex className="items-center gap-3">
        <HiMiniArrowLeft
          size={35}
          onClick={exitsChat}
          className="p-2 rounded-md hover:bg-neutral-100 cursor-pointer"
        />
        <div className="flex flex-col">
          <Paragraph fontPoppins className="font-medium text-base">
            {user?.name}
          </Paragraph>
          <Paragraph
            fontRoboto
            className={`font-medium text-xs ${
              isactive ? "text-green-500" : "text-neutral-500"
            }`}
          >
            {isactive ? "online" : "offline"}
          </Paragraph>
        </div>
        {user.isVerified && (
          <MdVerified size={16} className="text-primaryColor -translate-x-2" />
        )}
      </Flex>
      <HiOutlineDotsCircleHorizontal
        size={25}
        className="cursor-pointer"
        onClick={open}
      />
    </FlexBetween>
  );
};

export default Header;
