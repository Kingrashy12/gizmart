import React from "react";
import { IconWrap } from "..";
// import { FiPackage } from "react-icons/fi";
import { LuPackageCheck } from "react-icons/lu";
import { MdLocalShipping } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import { TbShoppingCartCancel } from "react-icons/tb";
import { AiOutlineFileDone } from "react-icons/ai";

type TypeCardProps = {
  notification: NotificationType;
};

const getType = (type: TypeCardProps["notification"]["type"]) => {
  switch (type) {
    case "orderReceived":
      return (
        <IconWrap
          Icon={IoMdCart}
          size={31}
          useCustom
          className="p-1 rounded-full text-primaryColor bg-[rgb(255,188,0,.3)] flex items-center justify-center w-auto"
        />
      );
    case "orderConfirmed":
      return (
        <IconWrap
          Icon={LuPackageCheck}
          size={31}
          useCustom
          className="p-1 rounded-full text-blue-500 bg-blue-200 flex items-center justify-center w-auto"
        />
      );
    case "orderCanceled":
      return (
        <IconWrap
          Icon={TbShoppingCartCancel}
          size={31}
          useCustom
          className="p-1 rounded-full text-red-600 bg-red-200 flex items-center justify-center w-auto"
        />
      );
    case "orderOutForDelivery":
      return (
        <IconWrap
          Icon={MdLocalShipping}
          size={31}
          useCustom
          className="p-1 rounded-full text-teal-500 bg-teal-200 flex items-center justify-center w-auto"
        />
      );
    case "orderDelivered":
      return (
        <IconWrap
          Icon={AiOutlineFileDone}
          size={31}
          useCustom
          className="p-1 rounded-full text-green-500 bg-green-200 flex items-center justify-center w-auto"
        />
      );
  }
};

const TypeCard = ({ notification: { type } }: TypeCardProps) => {
  return <>{getType(type)}</>;
};

export default TypeCard;
