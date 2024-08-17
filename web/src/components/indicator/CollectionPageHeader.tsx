import { Paragraph } from "@/lib";
import React from "react";

interface HeaderProps {
  label: string;
  className?: string;
}

const CollectionPageHeader = ({ label, className }: HeaderProps) => {
  return (
    <Paragraph
      fontPoppins
      fontWeight="semi-bold"
      className={`${className} text-lg text-center p-2 border-b border-t`}
    >
      {label}
    </Paragraph>
  );
};

export default CollectionPageHeader;
