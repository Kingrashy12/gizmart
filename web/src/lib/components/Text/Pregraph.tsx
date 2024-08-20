import { poppinsFont, robotoFont } from "@/lib/fonts/font";
import React from "react";
import { TextProps } from "@/lib/types";

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

const Pregraph = ({
  className,
  style,
  children,
  onClick,
  fontPoppins,
  fontRoboto,
  fontWeight,
}: TextProps) => {
  return (
    <pre
      style={{ ...style, fontWeight: getWeight(fontWeight) }}
      onClick={onClick}
      className={`${className} ${fontPoppins && poppinsFont.className} ${
        fontRoboto && robotoFont.className
      }`}
    >
      {children}
    </pre>
  );
};

export default Pregraph;
