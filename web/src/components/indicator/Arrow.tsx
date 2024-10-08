import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { Icon } from "@tremor/react";
import React from "react";
import { IconWrap } from "..";

type ArrowType = "fixed-scroll" | "normal";

type ArrowProps = {
  size: number;
  className?: string;
  style?: React.CSSProperties;
  type: ArrowType;
  position: "left" | "right";
  onClick?: (e?: any) => void;
  disabled?: boolean;
};

const getArrow = (
  size: ArrowProps["size"],
  className: ArrowProps["className"],
  style: ArrowProps["style"],
  type: ArrowProps["type"],
  position: ArrowProps["position"],
  onClick: ArrowProps["onClick"],
  disabled: ArrowProps["disabled"]
) => {
  switch (type) {
    case "fixed-scroll":
      return (
        <IconWrap
          onClick={onClick}
          Icon={position === "left" ? RiArrowLeftSLine : RiArrowRightSLine}
          size={size}
          style={style}
          useCustom
          className={`${className} ${
            disabled ? "cursor-not-allowed opacity-85" : "cursor-pointer"
          } text-white rounded-full hover:opacity-85 p-2 bg-black`}
        />
      );
    case "normal":
      return (
        <IconWrap
          onClick={onClick}
          Icon={position === "left" ? RiArrowLeftSLine : RiArrowRightSLine}
          size={size}
          style={style}
          useCustom
          className={`${className} cursor-pointer text-black`}
        />
      );
  }
};

const Arrow = ({
  size,
  type,
  position,
  onClick,
  style,
  className,
  disabled,
}: ArrowProps) => {
  return (
    <>{getArrow(size, className, style, type, position, onClick, disabled)}</>
  );
};

export default Arrow;
