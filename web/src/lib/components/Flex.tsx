import React from "react";

interface FlexProps {
  children: React.ReactNode;
  className?: string;
  ref?: React.ForwardedRef<HTMLDivElement>;
  removeFullWidth?: boolean;
  onClick?: (e?: React.ChangeEvent<HTMLDivElement> | any) => void;
  makeFixed?: boolean;
  makeAbsolute?: boolean;
}

const Flex = ({
  children,
  className,
  ref,
  removeFullWidth,
  onClick,
}: FlexProps) => {
  return (
    <div
      className={`${className} flex ${
        removeFullWidth ? "" : "w-full"
      } relative`}
      ref={ref}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Flex;
