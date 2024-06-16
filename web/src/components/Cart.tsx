import { useStateContext } from "@/context/StateContext";
import { CartClass, CartHeaderClass } from "./class";
import React from "react";
import { IoClose } from "react-icons/io5";
import { Divider } from "@/lib";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { closeCart } from "@/redux/cartSlice";

const Cart = () => {
  const showCart = useAppSelector((state) => state.cart.isOpen);
  const dispatch = useAppDispatch();

  return (
    <div className={`${showCart ? CartClass : "hidden"}`}>
      <div className={CartHeaderClass}>
        <h1 className="text-[20px]">Cart ({"3"})</h1>
        <IoClose
          onClick={() => dispatch(closeCart())}
          color="black"
          size={25}
          className="cursor-pointer"
        />
      </div>
      <Divider />
    </div>
  );
};

export default Cart;
