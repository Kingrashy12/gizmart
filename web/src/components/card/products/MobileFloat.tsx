import { HeightDivider, Paragraph } from "@/lib";
import { RiEqualizer2Line, RiFilter3Fill } from "@remixicon/react";
import { Icon } from "@tremor/react";
import React from "react";

interface FloatProps {
  openSort: any;
  openFilter: any;
}

const MobileFloat = ({ openFilter, openSort }: FloatProps) => {
  return (
    <div className="fixed gap-2 bottom-2 select-none hidden max-[480px]:flex left-1/2 -translate-x-1/2 bg-white drop-shadow rounded-lg p-2 justify-center items-center w-[200px] h-auto">
      <div className="flex items-center w-full select-none" onClick={openSort}>
        <Icon icon={RiEqualizer2Line} color="neutral" size="sm" />
        <Paragraph
          fontWeight="medium"
          fontRoboto
          className="text-sm select-none"
        >
          Sort by
        </Paragraph>
      </div>
      <HeightDivider />
      <div
        className="flex items-center w-full select-none"
        onClick={openFilter}
      >
        <Icon icon={RiFilter3Fill} color="neutral" size="sm" />
        <Paragraph fontWeight="medium" fontRoboto className="text-sm">
          Filter
        </Paragraph>
      </div>
    </div>
  );
};

export default MobileFloat;
