import { Flex } from "@/lib";
import React, { useState } from "react";
import Title from "../indicator/Title";
import { Icon } from "@tremor/react";
import { CustomIconType } from "@/types/app";

const CustomIcon = ({
  icon,
  iconClass,
  iconSize,
  className,
  title,
  titleClass,
  hasTitle,
  titleWidth,
  disabled,
  onClick,
  useCustom,
}: CustomIconType) => {
  const [showTitle, setShowTitle] = useState(false);
  function showT() {
    setShowTitle(true);
  }
  function hideT() {
    setShowTitle(false);
  }
  return (
    <Flex
      removeFullWidth
      className={`${className} flex-col w-auto items-center justify-center`}
    >
      {hasTitle && showTitle && (
        <Title
          title={title}
          className={`${titleClass} -bottom-9`}
          width={titleWidth}
        />
      )}
      <Icon
        icon={icon}
        onMouseEnter={showT}
        onMouseLeave={hideT}
        className={`${iconClass} z-50 ${
          disabled ? "text-neutral-400 cursor-not-allowed" : "cursor-pointer"
        }`}
        size={iconSize}
        onClick={onClick}
      />
    </Flex>
  );
};

export default CustomIcon;
