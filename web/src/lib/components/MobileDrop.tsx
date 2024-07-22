import { Dialog, DialogPanel } from "@tremor/react";
import React from "react";

interface DropProps {
  children: React.ReactNode;
  close: boolean;
  onClose: () => void;
}

const MobileDrop = ({ children, close, onClose }: DropProps) => {
  const currentWidth = global?.window?.innerWidth;
  const md = currentWidth <= 480;
  return (
    <>
      {md ? (
        <>
          <Dialog
            open={!close}
            onClose={onClose}
            static
            className="hidden max-[480px]:flex w-full h-full"
          >
            <DialogPanel
              style={{ background: "transparent", border: "0", borderWidth: 0 }}
              className="w-full flex h-full p-0 border-0 border-none"
            >
              <div className="w-full h-full">{children}</div>
            </DialogPanel>
          </Dialog>
        </>
      ) : (
        <div
          hidden={close}
          className="right-40 absolute max-[480px]:hidden flex"
        >
          {children}
        </div>
      )}
    </>
  );
};

export default MobileDrop;
