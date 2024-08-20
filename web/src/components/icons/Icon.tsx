import React from "react";
import { IconBase } from "react-icons/lib";

type IconType = {
  Icon: any;
  color?: string;
  className?: string;
  size: number;
  onClick?: (event?: any) => void;
  useCustom?: boolean;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
};

const Icon = ({
  Icon,
  className,
  color,
  size,
  onClick,
  useCustom,
  onMouseEnter,
  onMouseLeave,
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
            <Icon
              size={size}
              color={color}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />
          </IconBase>
        </div>
      )}
    </>
  );
};

export default Icon;
