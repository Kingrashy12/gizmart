import { IconWrap } from "@/components";
import { FlexBetween, Paragraph } from "@/lib";
import React from "react";

type PaymentCardType = {
  disabled?: boolean;
  icon: any;
  method: string;
  onSelect: (method: string, disabled: boolean | any) => void;
};

const PaymentCard = ({ disabled, icon, onSelect, method }: PaymentCardType) => {
  return (
    <FlexBetween
      className={`py-1 px-3 ${
        disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"
      }`}
      onClick={() => onSelect(method, disabled)}
    >
      <div className="flex items-center gap-2">
        <IconWrap Icon={icon} size={25} />
        <Paragraph fontPoppins className="font-medium text-sm">
          {method}
        </Paragraph>
      </div>
    </FlexBetween>
  );
};

export default PaymentCard;
