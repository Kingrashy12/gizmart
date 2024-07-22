import React, { useState } from "react";
import Wrapper from "../../Wrapper";
import { Paragraph } from "@/lib";
import { Icon } from "@tremor/react";
import {
  RiCheckboxBlankCircleLine,
  RiRecordCircleFill,
} from "@remixicon/react";
import { sorts } from "@/data/product";

interface SortProps {
  open: boolean;
  setopen: any;
  selected: any;
  setSelected: any;
}

const Sort = ({ open, setopen, selected, setSelected }: SortProps) => {
  return (
    <Wrapper
      onClick={(e) => e.stopPropagation()}
      className={`${
        open ? "flex" : "hidden"
      } h-auto p-16 top-7 z-50 right-0 max-[480px]:right-1/2 translate-x-1/2 max-[480px]:top-0 flex-col gap-2`}
      style={{ position: "absolute", width: 300 }}
    >
      {sorts.map((sort, index) => (
        <div
          key={index}
          onClick={() => setSelected(sort)}
          className="w-full relative flex cursor-pointer p-0 justify-between"
        >
          <Paragraph fontRoboto fontWeight="medium" className="text-lg">
            {sort.by}
          </Paragraph>
          <Icon
            icon={
              selected.by === sort.by
                ? RiRecordCircleFill
                : RiCheckboxBlankCircleLine
            }
            className="text-primaryColor"
          />
        </div>
      ))}
    </Wrapper>
  );
};

export default Sort;
