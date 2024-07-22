import React from "react";
import { NotIconClass } from "../class";
import { poppinsFont } from "../fonts/font";

interface NotTpye {
  data: any;
  className?: React.CSSProperties | any;
  style?: React.CSSProperties;
}

const NotIcon: React.FC<NotTpye> = ({ data, className, style }) => {
  return (
    <div className={`${NotIconClass} ${className} ${poppinsFont.className}`}>
      <p className="text-center" style={style}>
        {data}
      </p>
    </div>
  );
};

export default NotIcon;
