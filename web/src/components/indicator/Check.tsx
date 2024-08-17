import React from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IconWrap } from "..";
import { MdOutlineCircle } from "react-icons/md";

type CheckType = {
  isChecked: boolean;
  setIsChecked: () => void;
};

const Check = ({ isChecked, setIsChecked }: CheckType) => {
  return (
    <IconWrap
      Icon={isChecked ? IoIosCheckmarkCircle : MdOutlineCircle}
      size={25}
      onClick={setIsChecked}
      className="text-primaryColor cursor-pointer"
    />
  );
};

export default Check;
