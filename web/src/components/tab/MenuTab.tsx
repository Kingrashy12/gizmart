import { Active, NotIcon } from "@/lib";
import { poppinsFont } from "@/lib/fonts/font";
import { Icon } from "@tremor/react";
import Link from "next/link";
import React from "react";

interface TabProps {
  label: string;
  url?: string | any;
  isactive?: boolean | string | any;
  islink?: boolean;
  onClick?: () => void;
  icon: IconType;
  hasNot?: boolean;
  notValue?: string | number;
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
        className={`flex gap-0 items-center w-full p-1 cursor-pointer text-black rounded-md ${
          isactive && "bg-primaryColor text-white"
        }`}
      >
        <Icon
          icon={icon}
          size="md"
          className={isactive ? "text-white" : "text-black"}
        />
        <p className={`${poppinsFont.className} font-medium`}>{label}</p>
      </Link>
    );
  } else {
    return (
      <div
        onClick={onClick}
        className={`flex gap-0 items-center w-full p-1 cursor-pointer text-black rounded-md ${
          isactive && "bg-primaryColor text-white"
        }`}
      >
        <Icon
          icon={icon}
          size="md"
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
}: TabProps) => {
  return (
    <div className="flex items-center gap-3 w-full h-full">
      {isactive && <Active />}
      <div className="flex flex-col relative">
        {hasNot && <NotIcon data={notValue} className="left-0 top-1" />}
        {getTab(islink, label, url, onClick, isactive, icon)}
      </div>
    </div>
  );
};

export default MenuTab;
