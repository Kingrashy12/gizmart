import { Dialog, DialogPanel } from "@tremor/react";
import React from "react";

type PopType = {
  isOpen: boolean;
  children: React.ReactNode;
  hasButton?: boolean;
  buttonUrl?: string;
  onClose: (val?: boolean) => void;
  className?: string;
};

const PopMessage = ({
  isOpen,
  children,
  buttonUrl,
  hasButton,
  onClose,
  className,
}: PopType) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="z-[300]" static>
      <DialogPanel
        style={{
          background: "white",
          borderStyle: "none",
          borderWidth: 0,
          borderColor: "white",
          borderRadius: 0,
        }}
        className={`${className}`}
      >
        {children}
      </DialogPanel>
    </Dialog>
  );
};

export default PopMessage;
