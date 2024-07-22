import React from "react";

interface TimeContainerProps {
  label: string;
  time: string | number | any;
}

const TimeContainer = ({ label, time }: TimeContainerProps) => {
  return (
    <div className="flex h-[50px] w-16 text-white flex-col justify-center border border-neutral-600 p-2 rounded-md items-center">
      <span className="font-bold text-lg">{time}</span>
      <p className="font-medium text-[11px]">{label}</p>
    </div>
  );
};

export default TimeContainer;
