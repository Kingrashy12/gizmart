import { Flex, HeaderOne, Paragraph } from "@/lib";
import React from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdOutlinePendingActions } from "react-icons/md";
import { VscError } from "react-icons/vsc";

interface StatusCardProps {
  type: "pending" | "processing" | "complete" | "cancelled";
  label: string;
  total: number;
}

const getType = (
  type: StatusCardProps["type"],
  total: StatusCardProps["total"]
) => {
  switch (type) {
    case "pending":
      return (
        <Flex className="items-center gap-3 text-[#03A9F4]">
          <MdOutlinePendingActions size={60} className="text-primaryColor/" />
          <HeaderOne
            fontPoppins
            className="text-5xl font-semibold text-primaryColor/"
          >
            {total}
          </HeaderOne>
        </Flex>
      );
    case "complete":
      return (
        <Flex className="items-center gap-3">
          <AiOutlineFileDone size={60} className="text-green-500" />
          <HeaderOne
            fontPoppins
            className="text-5xl font-semibold text-green-500"
          >
            {total}
          </HeaderOne>
        </Flex>
      );
    case "cancelled":
      return (
        <Flex className="items-center gap-3">
          <VscError size={60} className="text-red-600" />
          <HeaderOne
            fontPoppins
            className="text-5xl font-semibold text-red-600"
          >
            {total}
          </HeaderOne>
        </Flex>
      );
  }
};

const StatusCard = ({ type, label, total }: StatusCardProps) => {
  return (
    <div className="flex flex-col p-4 rounded-lg bg-ProductBg gap-2 items-start w-64 flex-wrap">
      {getType(type, total)}
      <Paragraph fontRoboto className="text-neutral-300 text-xl font-medium">
        {label}
      </Paragraph>
    </div>
  );
};

export default StatusCard;
