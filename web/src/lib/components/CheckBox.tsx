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
    <Icon
      onClick={setEnabled}
      icon={enabled ? RiCheckboxCircleFill : RiCheckboxBlankCircleLine}
      className="text-primaryColor cursor-pointer"
    />
  );
};

export default Check;
