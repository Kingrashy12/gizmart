import React from "react";
import { IconBase } from "react-icons/lib";

type IconType = {
  Icon: any;
  color?: string;
  className?: string;
  size: number;
  onClick?: (event?: any) => void;
  useCustom?: boolean;
};

const Icon = ({
  Icon,
  className,
  color,
  size,
  onClick,
  useCustom,
}: IconType) => {
  return (
    <>
      {useCustom ? (
        <>
          <Icon
            size={size}
            color={color}
            className={className}
            onClick={onClick}
          />
        </>
      ) : (
        <div>
          <IconBase size={size} className={className} onClick={onClick}>
            <Icon size={size} color={color} />
          </IconBase>
        </div>
      )}
    </>
  );
};

export default Icon;
