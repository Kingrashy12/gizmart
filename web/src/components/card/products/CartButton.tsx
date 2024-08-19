import React, { useState } from "react";
import { Flex, FlexBetween, Paragraph } from "@/lib";
import CustomButton from "@/components/CustomButton";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import {
  addToCart,
  decreaseQty,
  incressQty,
  removeItem,
} from "@/redux/cartSlice";
import { RiEdit2Fill } from "@remixicon/react";
import EditProduct from "@/components/modal/EditProduct";

type CartButtonType = {
  product: ProductType;
};

const CartButton = ({ product }: CartButtonType) => {
  const dispatch = useAppDispatch();
  const cartState = useAppSelector((state) => state.cart);
  const cart = cartState.items;
  const isAdded = cart?.find((item) => item._id === product._id);
  const userId = useAppSelector((state) => state.auth.userId);
  const [openEdit, setOpenEdit] = useState(false);

  const qty = cartState.quantity.filter((pr) => pr === product._id);
  function add_ToCart(e: React.ChangeEvent | any) {
    e.preventDefault();
    dispatch(addToCart(product));
  }
  function increase(e: React.ChangeEvent | any) {
    e.preventDefault();
    const maxLimit = product.quantity;
    if (qty.length === maxLimit) {
      toast.success("Max quantity reached");
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
  function edit(e: React.ChangeEvent) {
    e.preventDefault();
    setOpenEdit(true);
  }

  return (
    <Flex>
      {product.userId === userId ? (
        <CustomButton
          onClick={edit}
          variant="primary"
          className="w-full"
          icon={RiEdit2Fill}
        >
          Edit
        </CustomButton>
      ) : (
        <>
          {isAdded ? (
            <FlexBetween
              className="items-center"
              onClick={(e) => e.preventDefault()}
            >
              <CustomButton variant="secondary" onClick={decrease}>
                -
              </CustomButton>
              <Paragraph fontPoppins fontWeight="semi-bold">
                {qty.length}
              </Paragraph>
              <CustomButton onClick={increase} variant="secondary">
                +
              </CustomButton>
            </FlexBetween>
          ) : (
            <CustomButton
              variant="primary"
              className={`${product.quantity === 0 ? "hidden" : "w-full"}`}
              onClick={add_ToCart}
            >
              Add to cart
            </CustomButton>
          )}
        </>
      )}
      <EditProduct
        closeEdit={() => setOpenEdit(false)}
        product={product}
        isOpen={openEdit}
      />
    </Flex>
  );
};

export default CartButton;
