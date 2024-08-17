import { ButtonProps } from "@/types/app";
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
  iconPosition,
}: ButtonProps) => {
  const primary = variant === "primary";
  const secondary = variant === "secondary";
  const danger = variant === "danger";
  const transparent = variant === "transparent";
  const pending = variant === "pending";
  const success = variant === "success";
  return (
    <Button
      onClick={onClick}
      icon={icon}
      loading={isloading}
      disabled={disabled}
      style={style}
      iconPosition={iconPosition}
      className={`${className} ${
        primary &&
        `bg-primaryColor ${
          disabled ? "hover:bg-opacity-60" : "hover:bg-primaryColor"
        } hover:opacity-75 border-none outline-none`
      } ${
        secondary &&
        `bg-transparent border-2 text-primaryColor border-primaryColor ${
          disabled ? "" : "hover:bg-primaryColor"
        } hover:border-primaryColor hover:bg-opacity-10`
      } ${
        danger &&
        "bg-transparent border-2 border-[red] text-[red] hover:bg-red-100 hover:border-[red] hover:opacity-75"
      } ${transparent && "bg-transparent text-primaryColor hover:opacity-70"} ${
        pending && "bg-blue-500 text-white"
      } ${success && "bg-green-500 text-white"}`}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
