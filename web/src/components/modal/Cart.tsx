import { useCartModal } from "@/context/useCart";
import { useAppSelector } from "@/hooks/store";
import { Dialog, DialogPanel, Icon } from "@tremor/react";
import React from "react";
import { modalclasses } from "./class";
import { poppinsFont } from "@/lib/fonts/font";
import { RiCloseFill } from "@remixicon/react";
import { Flex, No_Products_Found } from "@/lib";
import CartProduct from "../card/cart/CartProduct";
import CartDetails from "../card/cart/CartDetails";

const Cart = () => {
  const { isOpen, onClose } = useCartModal();
  const auth = useAppSelector((state) => state.auth);
  const cartState = useAppSelector((state) => state.cart);
  return (
    <Dialog open={isOpen} onClose={onClose} className="z-[300]" static>
      <DialogPanel
        style={{ borderRadius: 0 }}
        className={modalclasses.cartdialog}
      >
        <Flex
          className={`flex flex-col w-full gap-5 relative h-full ${poppinsFont.className}`}
        >
          <div className="flex justify-between border-b border-b-primaryGray items-center p-3 bg-[rgb(255,255,255,0.5)]">
            <p className="font-semibold text-lg text-black">
              Cart {`(${cartState.quantity.length})`}
            </p>
            <Icon
              icon={RiCloseFill}
              size="lg"
              style={{ color: "black" }}
              className="cursor-pointer"
              onClick={onClose}
            />
          </div>
          <Flex className={`flex-col gap-4 overflow-y-auto`}>
            {cartState.items.length >= 1 ? (
              cartState.items.map((product, index) => (
                <CartProduct key={index} product={product} />
              ))
            ) : (
              <No_Products_Found
                className="p-2"
                message="Your cart is currently empty. Please add some products to get started!"
              />
            )}
          </Flex>
          {cartState.items.length >= 1 ? <CartDetails /> : null}
        </Flex>
      </DialogPanel>
    </Dialog>
  );
};

export default Cart;
