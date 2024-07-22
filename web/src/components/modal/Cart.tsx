import { useCartModal } from "@/context/useCart";
import { useAppSelector } from "@/hooks/store";
import { Dialog, DialogPanel, Icon } from "@tremor/react";
import React from "react";
import { modalclasses } from "./class";
import { poppinsFont } from "@/lib/fonts/font";
import { RiCloseFill } from "@remixicon/react";

const Cart = () => {
  const { isOpen, onClose } = useCartModal();
  const auth = useAppSelector((state) => state.auth);
  return (
    <Dialog open={isOpen} onClose={onClose} className="z-[300]" static>
      <DialogPanel
        style={{ borderRadius: 0 }}
        className={modalclasses.cartdialog}
      >
        <div
          className={`flex flex-col w-full gap-5 relative h-auto ${poppinsFont.className}`}
        >
          <div className="flex justify-between border-b border-b-primaryGray items-center p-3 bg-[rgb(255,255,255,0.5)]">
            <p className="font-semibold text-lg text-black">Cart (3)</p>
            <Icon
              icon={RiCloseFill}
              size="lg"
              style={{ color: "black" }}
              className="cursor-pointer"
              onClick={onClose}
            />
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default Cart;
