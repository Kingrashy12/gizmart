import { robotoFont } from "@/lib/fonts/font";
import React from "react";

interface DiscountProps {
  value: any;
  className?: React.CSSProperties | any;
  style?: React.CSSProperties;
}

const Discount = ({ value, style, className }: DiscountProps) => {
  return (
    <div
      className={`absolute bg-[red] w-7 border border-white right-3 top-3 h-7 flex items-center justify-center rounded-full ${className} ${robotoFont.className}`}
    >
      <p className="text-center font-medium text-xs text-white" style={style}>
        {`-${value}`}
      </p>
    </div>
  );
};

export default Discount;
