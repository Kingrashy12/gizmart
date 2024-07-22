import React from "react";
import { DividerClass } from "../class";

interface DividerProps {
  className?: React.CSSProperties | any;
}

const Divider = ({ className }: DividerProps) => {
  return <div className={`${DividerClass} ${className}`} />;
};

export default Divider;
