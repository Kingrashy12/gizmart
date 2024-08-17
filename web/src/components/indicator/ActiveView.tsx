import React from "react";

interface ActiveProps {
  isactive: boolean | any;
  onClick?: () => void;
}

const ActiveView = ({ isactive, onClick }: ActiveProps) => {
  return (
    <div
      onClick={onClick}
      className={`w-4 h-4 rounded-full cursor-pointer ${
        isactive ? "bg-black" : "bg-primaryGray"
      }`}
    />
  );
};

export default ActiveView;
