import { Paragraph } from "@/lib";
import { poppinsFont } from "@/lib/fonts/font";
import { RiArrowUpSFill } from "@remixicon/react";
import { Icon } from "@tremor/react";
import React from "react";

interface TitleProps {
  title: string;
  className?: string;
  style?: React.CSSProperties;
  width?: string;
}

const Title = ({ title, className, style, width }: TitleProps) => {
  return (
    <div
      style={{ ...style, width: width }}
      className={`${className} bg-[rgb(0,0,0)] absolute rounded-md flex flex-col items-center`}
    >
      <Icon
        icon={RiArrowUpSFill}
        style={{ color: "black" }}
        size="md"
        className="absolute -top-5 max-[480px]:-top-[19px]"
      />
      <Paragraph
        className={`${className} text-white p-2 text-[12px]`}
        fontPoppins
        fontWeight="medium"
      >
        {title}
      </Paragraph>
    </div>
  );
};

export default Title;
