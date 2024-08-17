import React from "react";

interface FlexProps {
  children: React.ReactNode;
  className?: string;
  ref?: React.ForwardedRef<HTMLDivElement>;
  onClick?: (e?: React.ChangeEvent<HTMLDivElement> | any) => void;
}

const FlexBetween = ({ children, className, ref, onClick }: FlexProps) => {
  return (
    <div
      className={`${className} flex justify-between w-full relative`}
      ref={ref}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default FlexBetween;
