import { poppinsFont } from "@/lib/fonts/font";
import Link from "next/link";
import React from "react";

interface TabProps {
  label: string;
  url: string;
  className?: React.CSSProperties | any;
  style?: React.CSSProperties;
}

const NavTab = ({ url, label, className, style }: TabProps) => {
  return (
    <Link href="/category/[category]" as={url} style={style}>
      <p
        className={`${className} ${poppinsFont.className} font-medium hover:text-primaryColor flex items-center`}
      >
        {label}
      </p>
    </Link>
  );
};

export default NavTab;
