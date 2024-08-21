import { Active, NotIcon } from "@/lib";
import { poppinsFont } from "@/lib/fonts/font";
import { IconType } from "@/types/app";
import { Icon } from "@tremor/react";
import Link from "next/link";
import React from "react";
import { IconWrap } from "..";

interface TabProps {
  label: string;
  url?: string | any;
  isactive?: boolean;
  islink?: boolean;
  onClick?: () => void;
  icon: IconType;
  hasNot?: boolean;
  notValue?: string | number;
  className?: string;
}

const getTab = (
  islink: TabProps["islink"],
  label: TabProps["label"],
  url: TabProps["url"],
  onClick: TabProps["onClick"],
  isactive: TabProps["isactive"],
  icon: TabProps["icon"]
) => {
  if (islink) {
    return (
      <Link
        href={url}
        onClick={onClick}
        className={`flex gap-2 items-center border-none w-full p-1 cursor-pointer text-black rounded-md ${
          isactive && "bg-primaryColor text-white"
        }`}
      >
        <IconWrap
          Icon={icon}
          size={20}
          useCustom
          className={isactive ? "text-white" : "text-black"}
        />
        <p className={`${poppinsFont.className} font-medium`}>{label}</p>
      </Link>
    );
  } else {
    return (
      <div
        onClick={onClick}
        className={`flex gap-2 items-center border-none w-full p-1 cursor-pointer text-black rounded-md ${
          isactive && "bg-primaryColor text-white"
        }`}
      >
        <IconWrap
          Icon={icon}
          size={20}
          useCustom
          className={isactive ? "text-white" : "text-black"}
        />
        <p className={`${poppinsFont.className} font-medium`}>{label}</p>
      </div>
    );
  }
};

const MenuTab = ({
  isactive,
  islink,
  url,
  label,
  onClick,
  icon,
  hasNot,
  notValue,
  className,
}: TabProps) => {
  return (
    <div
      className={`${className} flex items-center gap-3 w-full h-full cursor-pointer border-none`}
    >
      {isactive && <Active />}
      <div className="flex flex-col relative w-full border-none">
        {hasNot && <NotIcon data={notValue} className="left-0 top-1" />}
        {getTab(islink, label, url, onClick, isactive, icon)}
      </div>
    </div>
  );
};

export default MenuTab;
