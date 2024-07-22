import { poppinsFont, robotoFont } from "@/lib/fonts/font";
import React from "react";

interface WrapperProps {
  children: React.ReactNode;
  className?: React.CSSProperties | any;
  style?: React.CSSProperties;
  fontPoppins?: boolean;
  fontRoboto?: boolean;
  onClick?: (e?: React.ChangeEvent<HTMLDivElement> | any) => void;
}

const Wrapper = ({
  children,
  className,
  style,
  fontPoppins,
  fontRoboto,
  onClick,
}: WrapperProps) => {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`collection_bg/ bg-white rounded-sm ${
        fontPoppins && poppinsFont.className
      } ${
        fontRoboto && robotoFont.className
      } drop-shadow w-auto px-5 py-3 relative ${className}`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
