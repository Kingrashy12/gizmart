import { Button } from "@tremor/react";
import React from "react";

const CustomButton = ({
  children,
  className,
  style,
  variant,
  onClick,
  icon,
  isloading,
  disabled,
}: ButtonProps) => {
  const primary = variant === "primary";
  const secondary = variant === "secondary";
  const danger = variant === "danger";
  return (
    <Button
      onClick={onClick}
      icon={icon}
      loading={isloading}
      disabled={disabled}
      style={style}
      className={`${className} ${
        primary &&
        "bg-primaryColor hover:bg-primaryColor hover:opacity-75 border-none outline-none"
      } ${
        secondary &&
        "bg-transparent border-2 text-primaryColor border-primaryColor hover:bg-primaryColor hover:border-primaryColor hover:bg-opacity-10"
      } ${
        danger &&
        "bg-transparent border-2 border-[red] text-[red] hover:bg-red-100 hover:border-[red] hover:opacity-75"
      }`}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
