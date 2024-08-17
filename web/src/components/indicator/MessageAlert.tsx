import { Paragraph } from "@/lib";
import React from "react";

interface M_AlertProps {
  alert?: number;
  onlyBadge?: boolean;
  className?: string;
}

const MessageAlert = ({ alert, onlyBadge, className }: M_AlertProps) => {
  if (alert === 0) {
    return null;
  }

  return (
    <div className={`flex absolute right-2 ${className}`}>
      {onlyBadge ? (
        <div className="w-3 h-3 rounded-full bg-primaryColor" />
      ) : alert ? (
        <Paragraph
          fontPoppins
          className="bg-red-600 border border-black p-2 text-xs rounded-full w-5 h-5 flex items-center justify-center text-white"
        >
          {alert}
        </Paragraph>
      ) : null}
    </div>
  );
};

export default MessageAlert;
