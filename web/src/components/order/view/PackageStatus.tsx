import { IconWrap } from "@/components";
import { inter } from "@/lib/fonts/font";
import { RiCheckboxBlankCircleLine } from "@remixicon/react";
import React from "react";
import { MdCancel, MdCheckCircle } from "react-icons/md";

const StatusLine: React.FC<{ done: boolean }> = ({ done }) => (
  <div className={`${done ? "bg-primaryColor" : "bg-neutral-400"} w-1 h-12`} />
);
const StatusTag: React.FC<{
  tag: string;
  done: boolean;
  placed?: boolean;
  isdelivered?: boolean;
}> = ({ tag, done, placed, isdelivered }) => (
  <p
    className={`text-xs uppercase p-1 font-light rounded-sm w-fit text-center ${
      inter.className
    } ${placed && "bg-primaryColor"} ${isdelivered && "text-green-500"} ${
      done ? "bg-primaryColor" : "bg-neutral-500"
    } text-white font-normal`}
  >
    {tag}
  </p>
);

const PackageStatus: React.FC<{ order: OrderType }> = ({ order }) => {
  const confirmed = order?.deliveryStatus === "Confirmed";
  const outForDelivery = order?.deliveryStatus === "Out for delivery";
  const delivered = order?.deliveryStatus === "Delivered";
  const cancelled = order.status === "cancelled";
  const isCompleted = order?.deliveryStatus === "Delivered";

  return (
    <div className="flex gap-5 h-full relative">
      <div className="flex flex-col items-center justify-between relative h-full">
        <IconWrap
          Icon={MdCheckCircle}
          size={25}
          className="border-2/ rounded-full border-white text-primaryColor"
        />
        <div className={`bg-primaryColor w-1 h-12`} />
        <IconWrap
          Icon={
            confirmed || isCompleted
              ? MdCheckCircle
              : cancelled
              ? MdCancel
              : RiCheckboxBlankCircleLine
          }
          size={25}
          className={`${
            confirmed || isCompleted ? "text-primaryColor" : "text-neutral-500"
          }`}
        />
        <StatusLine done={confirmed || isCompleted} />
        <IconWrap
          Icon={
            outForDelivery || isCompleted
              ? MdCheckCircle
              : cancelled
              ? MdCancel
              : RiCheckboxBlankCircleLine
          }
          size={25}
          className={`${
            outForDelivery || isCompleted
              ? "text-primaryColor"
              : "text-neutral-500"
          }`}
        />
        <StatusLine done={outForDelivery || isCompleted} />
        <IconWrap
          Icon={
            delivered
              ? MdCheckCircle
              : cancelled
              ? MdCancel
              : RiCheckboxBlankCircleLine
          }
          size={25}
          className={`${
            delivered || isCompleted ? "text-green-500" : "text-neutral-500"
          }`}
        />
        <div
          className={`bg-transparent w-1 h-12 ${
            delivered ? "block" : "hidden"
          }`}
        />
        <div
          className={`bg-transparent w-1 h-3 ${delivered ? "block" : "hidden"}`}
        />
      </div>
      <div className="flex flex-col justify-between">
        <StatusTag tag="Placed" placed done />
        <StatusTag tag="Pending confirmation" done={confirmed || isCompleted} />
        <StatusTag
          tag="Out for delivery"
          done={outForDelivery || isCompleted}
        />
        <StatusTag tag=" Delivered" isdelivered done={delivered} />
        {delivered && (
          <p
            className={`${inter.className} text-xs text-neutral-600 font-normal`}
          >
            Your package has been delivered.
          </p>
        )}
      </div>
    </div>
  );
};

export default PackageStatus;
