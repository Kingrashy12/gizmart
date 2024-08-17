import { inter, poppinsFont, robotoFont } from "@/lib/fonts/font";
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

const Paragraph = ({
  className,
  style,
  children,
  onClick,
  fontPoppins,
  fontRoboto,
  fontWeight,
  fontInter,
  dangerouslySetInnerHTML,
}: TextProps) => {
  return (
    <p
      style={{ ...style, fontWeight: getWeight(fontWeight) }}
      onClick={onClick}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      className={`${className} ${fontPoppins && poppinsFont.className} ${
        fontRoboto && robotoFont.className
      } ${fontInter && inter.className}`}
    >
      {children}
    </p>
  );
};

export default Paragraph;
