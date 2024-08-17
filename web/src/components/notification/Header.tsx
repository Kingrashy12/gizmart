import { HeaderOne, Paragraph, FlexBetween } from "@/lib";
import React from "react";
import { IoArrowBack } from "react-icons/io5";

const Header: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <FlexBetween className="p-3 border-b items-center">
      <div className="gap-5 items-center flex">
        <IoArrowBack
          size={25}
          className="hidden max-[550px]:flex"
          onClick={onClose}
        />
        <HeaderOne fontPoppins className="font-semibold text-lg">
          Notification
        </HeaderOne>
      </div>
      <Paragraph
        fontInter
        className="text-blue-600 font-normal text-sm cursor-pointer hover:opacity-75"
      >
        Mark all as read
      </Paragraph>
    </FlexBetween>
  );
};

export default Header;
