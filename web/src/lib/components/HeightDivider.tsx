import React from "react";

interface DividerProps {
  className?: React.CSSProperties | string;
}

const HeightDivider = ({ className }: DividerProps) => {
  return <div className={`${className} h-5 w-[1px] bg-primaryGray`} />;
};

export default HeightDivider;
