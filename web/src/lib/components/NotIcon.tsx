import React from "react";
import { NotIconClass } from "../class";
import { poppinsFont } from "../fonts/font";

interface NotTpye {
  data: any;
  className?: React.CSSProperties | any;
  style?: React.CSSProperties;
}

const NotIcon: React.FC<NotTpye> = ({ data, className, style }) => {
  if (data < 1) {
    return null;
  }
  return (
    <div
      className={`${NotIconClass} ${className} ${poppinsFont.className}`}
      style={style}
    >
      <p className="text-center">{data}</p>
    </div>
  );
};

export default NotIcon;
