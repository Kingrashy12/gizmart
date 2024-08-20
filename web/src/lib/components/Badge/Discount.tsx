import { robotoFont } from "@/lib/fonts/font";
import React from "react";
import Paragraph from "../Text/Paragraph";

interface DiscountProps {
  value: any;
  className?: React.CSSProperties | any;
  style?: React.CSSProperties;
}

const Discount = ({ value, style, className }: DiscountProps) => {
  return (
    <div
      className={`absolute bg-[red] w-7 border border-white right-1 top-1 h-7 flex items-center justify-center rounded-full ${className}`}
    >
      <Paragraph
        fontInter
        className="text-center font-medium text-xs text-white"
        style={style}
      >
        {value}
      </Paragraph>
    </div>
  );
};

export default Discount;
