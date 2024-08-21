import { IconWrap } from "@/components";
import {
  RiCheckboxBlankCircleFill,
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "@remixicon/react";
import { Icon } from "@tremor/react";
import React from "react";

interface CheckProps {
  enabled: boolean;
  setEnabled: any;
}

const Check = ({ enabled, setEnabled }: CheckProps) => {
  return (
    <IconWrap
      onClick={setEnabled}
      useCustom
      size={25}
      Icon={enabled ? RiCheckboxCircleFill : RiCheckboxBlankCircleLine}
      className="text-primaryColor cursor-pointer"
    />
  );
};

export default Check;
