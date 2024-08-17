import { Flex, Paragraph } from "@/lib";
import React from "react";
import { MenuIconClass } from "../../class";
import { MdBlock } from "react-icons/md";
import { TbMessageReport } from "react-icons/tb";
import { AiOutlineClear } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";

type MenuIconType = {
  className?: string;
  onClick?: () => void;
  type: "search" | "clear" | "block" | "report";
  name?: string;
};

const getIcon = (
  type: MenuIconType["type"],
  className: MenuIconType["className"],
  onClick: MenuIconType["onClick"],
  name: MenuIconType["name"]
) => {
  switch (type) {
    case "search":
      return (
        <Flex className={`${className} ${MenuIconClass}`} onClick={onClick}>
          <IoSearchOutline size={25} />
          <Paragraph>Search</Paragraph>
        </Flex>
      );
    case "block":
      return (
        <Flex className={`${className} ${MenuIconClass}`} onClick={onClick}>
          <MdBlock size={25} />
          <Paragraph>Block {name}</Paragraph>
        </Flex>
      );
    case "report":
      return (
        <Flex className={`${className} ${MenuIconClass}`} onClick={onClick}>
          <TbMessageReport size={25} />
          <Paragraph>Report</Paragraph>
        </Flex>
      );
    case "clear":
      return (
        <Flex className={`${className} ${MenuIconClass}`} onClick={onClick}>
          <AiOutlineClear size={25} />
          <Paragraph>Clear chat</Paragraph>
        </Flex>
      );
  }
};

const MenuIcon = ({ type, className, onClick, name }: MenuIconType) => {
  return <>{getIcon(type, className, onClick, name)}</>;
};

export default MenuIcon;
