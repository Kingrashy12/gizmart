import { FlexBetween, HeaderOne } from "@/lib";
import React from "react";
import { IoClose } from "react-icons/io5";
import SettingsCard, { SolidSettingsCard } from "../card/SettingsCard";
import { FaPhoneAlt, FaUserCircle } from "react-icons/fa";
import { MdAlternateEmail, MdOutlineDelete } from "react-icons/md";
import { RiLockPasswordLine } from "@remixicon/react";

interface MainProps {
  onClose: () => void;
}

const MainCard = ({ onClose }: MainProps) => {
  return (
    <>
      <FlexBetween className="items-center text-black p-3 border-b-[13px] border-b-softGray">
        <HeaderOne fontPoppins className="font-semibold text-xl">
          Settings
        </HeaderOne>
        <IoClose
          onClick={onClose}
          className="cursor-pointer hover:bg-neutral-200 p-2 rounded-md"
          size={40}
        />
      </FlexBetween>
      <SettingsCard
        icon={<FaUserCircle size={25} />}
        setting="Personal information"
      />
      <SettingsCard icon={<FaPhoneAlt size={25} />} setting="Phone numbers" />
      <SettingsCard
        icon={<MdAlternateEmail size={25} />}
        setting="Change email"
        hideDivider
      />
      <div className="bg-softGray p-9" />
      <SolidSettingsCard
        icon={<RiLockPasswordLine size={25} />}
        setting="Change password"
      />
      <SolidSettingsCard
        icon={<MdOutlineDelete size={25} />}
        setting="Delete my account"
      />
    </>
  );
};

export default MainCard;
