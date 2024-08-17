import React from "react";

interface StatusProps {
  isOnline?: boolean;
  isOffline?: boolean;
}

const OnlineStatus = ({ isOnline, isOffline }: StatusProps) => {
  return (
    <div
      className={`w-4 h-4 absolute rounded-full p-1 ${
        isOnline && "bg-green-500"
      } ${isOffline && " bg-neutral-400"}`}
    />
  );
};

export default OnlineStatus;
