import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { Paragraph } from "@/lib";
import { decreaseQty, incressQty, removeItem } from "@/redux/cartSlice";
import React from "react";
import toast from "react-hot-toast";
import { HiMinusCircle } from "react-icons/hi2";
import { RiAddCircleFill } from "react-icons/ri";
type CartButtonType = {
  product: ProductType;
};

const Cart_Button = ({ product }: CartButtonType) => {
  const dispatch = useAppDispatch();

  function increase(e: React.ChangeEvent | any) {
    e.preventDefault();
    const maxLimit = product.quantity;
    if (qty.length === maxLimit) {
      toast.success("You've reached max quantity");
    } else {
      dispatch(incressQty(product));
    }
  }

  function decrease(e: React.ChangeEvent | any) {
    e.preventDefault();
    if (qty.length >= 1) {
      const updatedTotal = qty.length - 1;
      dispatch(decreaseQty(product));
      if (updatedTotal === 0) {
        dispatch(removeItem(product));
      }
    }
  }

  const cartState = useAppSelector((state) => state.cart);
  const qty = cartState.quantity.filter((id) => id === product._id);
  return (
    <div className="p-2 rounded-lg flex flex-col gap-1 items-center justify-between">
      <RiAddCircleFill
        size={23}
        className="cursor-pointer text-primaryColor"
        onClick={increase}
      />
      <Paragraph fontPoppins className="font-semibold text-sm select-none">
        {qty.length}
      </Paragraph>
      <HiMinusCircle
        size={23}
        className="cursor-pointer text-primaryColor"
        onClick={decrease}
      />
    </div>
  );
};

export default Cart_Button;
