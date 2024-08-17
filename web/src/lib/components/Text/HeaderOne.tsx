import { poppinsFont, robotoFont } from "@/lib/fonts/font";
import { TextProps } from "@/lib/types";
import React from "react";

const getWeight = (fontWeight: TextProps["fontWeight"]) => {
  switch (fontWeight) {
    case "normal":
      return 400;
    case "medium":
      return 500;
    case "semi-bold":
      return 600;
    case "bold":
      return 700;
  }
};

const HeaderOne = ({
  className,
  style,
  children,
  onClick,
  fontPoppins,
  fontRoboto,
  fontWeight,
  dangerouslySetInnerHTML,
}: TextProps) => {
  return (
    <h1
      style={{ ...style, fontWeight: getWeight(fontWeight) }}
      onClick={onClick}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      className={`${className} ${fontPoppins && poppinsFont.className} ${
        fontRoboto && robotoFont.className
      }`}
    >
      {children}
    </h1>
  );
};

export default HeaderOne;
