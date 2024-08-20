import { FlexBetween, HeaderOne } from "@/lib";
import React from "react";
import { IoClose } from "react-icons/io5";
import SettingsCard, { SolidSettingsCard } from "../card/SettingsCard";
import { FaPhoneAlt, FaUserCircle } from "react-icons/fa";
import { MdAlternateEmail, MdOutlineDelete } from "react-icons/md";
import { RiLockPasswordLine } from "@remixicon/react";
import { BsHouseAddFill } from "react-icons/bs";

interface MainProps {
  onClose: () => void;
  exitChange: React.Dispatch<React.SetStateAction<SettingsCurrentType>>;
}

const MainCard = ({ onClose, exitChange }: MainProps) => {
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
        onClick={() => exitChange("info")}
      />
      <SettingsCard icon={<FaPhoneAlt size={25} />} setting="Phone numbers" />
      <SettingsCard
        icon={<MdAlternateEmail size={25} />}
        setting="Change email"
        onClick={() => exitChange("email")}
      />
      <SettingsCard
        icon={<BsHouseAddFill size={25} />}
        setting="Manage Address"
        onClick={() => exitChange("address")}
        hideDivider
      />
      <div className="bg-softGray p-9" />
      <SolidSettingsCard
        icon={<RiLockPasswordLine size={25} />}
        setting="Change password"
        onClick={() => exitChange("password")}
      />
      <SolidSettingsCard
        icon={<MdOutlineDelete size={25} />}
        setting="Delete my account"
      />
    </>
  );
};

export default MainCard;
