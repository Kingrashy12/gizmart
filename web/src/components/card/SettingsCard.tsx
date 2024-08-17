import { Flex, FlexBetween, Paragraph } from "@/lib";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

type SettingsCardType = {
  icon: any;
  setting: string;
  className?: string;
  onClick?: () => void;
  hideDivider?: boolean;
};

const SettingsCard = ({
  icon,
  setting,
  className,
  onClick,
  hideDivider,
}: SettingsCardType) => {
  return (
    <>
      <FlexBetween
        className={`${className} items-center px-6 py-1 cursor-pointer`}
        onClick={onClick}
      >
        <Flex className="items-center gap-4">
          <div className="p-[6px] rounded-md bg-primaryColor text-white">
            {icon}
          </div>
          <Paragraph fontPoppins className="text-black font-medium text-base">
            {setting}
          </Paragraph>
        </Flex>
        <IoIosArrowForward color="black" size={25} />
      </FlexBetween>
      {hideDivider ? null : (
        <div className="border-b-[10px] border-b-softGray" />
      )}
    </>
  );
};

export default SettingsCard;

export const SolidSettingsCard = ({
  icon,
  setting,
  className,
  onClick,
}: SettingsCardType) => {
  return (
    <>
      <FlexBetween
        className={`${className} items-center px-6 py-1 cursor-pointer`}
        onClick={onClick}
      >
        <Flex className="items-center gap-4">
          <div className="p-[6px] rounded-md bg-softGray text-black">
            {icon}
          </div>
          <Paragraph fontPoppins className="text-black font-medium text-base">
            {setting}
          </Paragraph>
        </Flex>
        <IoIosArrowForward color="black" size={25} />
      </FlexBetween>
      <div className="border-b-[10px] border-b-softGray" />
    </>
  );
};
