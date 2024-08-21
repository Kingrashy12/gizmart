import { Appcolors } from "@/styles/global";
import { ButtonProps } from "@/types/app";
import { Button } from "@tremor/react";
import React from "react";

const buttonStyles = (variant: ButtonProps["variant"]) => {
  switch (variant) {
    case "primary":
      return { background: Appcolors.PrimaryColor, color: "white" };
    case "secondary":
      return {
        background: "transparent",
        borderColor: Appcolors.PrimaryColor,
        color: Appcolors.PrimaryColor,
      };
    case "danger":
      return {
        background: "transparent",
        borderColor: "rgb(255,0,0)",
        color: "rgb(255,0,0)",
      };
    case "pending":
      return {
        background: "rgb(59,130,246)",
        borderStyle: "none",
        color: "white",
      };
    case "success":
      return {
        background: "rgb(34,197,94)",
        borderStyle: "none",
        color: "white",
      };
  }
};

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
      style={{ ...buttonStyles(variant), ...style }}
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
