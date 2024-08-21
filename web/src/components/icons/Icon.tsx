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
  style?: React.CSSProperties;
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
  style,
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
            style={style}
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
