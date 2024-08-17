import CustomButton from "@/components/CustomButton";
import { useBackgroundLoader } from "@/context/useBackgroundLoader";
import { useCartModal } from "@/context/useCart";
import { useCheckOutModal } from "@/context/useCheckout";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { Flex, FlexBetween, Paragraph } from "@/lib";
import { clear_cart } from "@/redux/cartSlice";
import { check_out_product, reset_status } from "@/redux/orderSlice";
import { productCheckout } from "@/redux/thunks/order";
import { clearDiscount } from "@/redux/voucherSlice";
import { nairaSym } from "@/styles/global";
import { RiArrowRightLine } from "@remixicon/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartDetails = () => {
  const cartState = useAppSelector((state) => state.cart);
  const products = useAppSelector((state) => state.product.products);
  const user = useAppSelector((state) => state.auth);
  const userId = user.userId;
  const dispatch = useAppDispatch();
  const { onOpen, onClose } = useBackgroundLoader();
  const [isChecking, setIsChecking] = useState(false);
  const { onOpen: openCheckout } = useCheckOutModal();
  const { onClose: closeCart } = useCartModal();
  const router = useRouter();

  useEffect(() => {
    if (isChecking) {
      onOpen();
    } else {
      onClose();
    }
  }, [isChecking]);

  function calTotal() {
    const qty = cartState.quantity;
    let Products: any[] = [];
    qty.forEach((p) => {
      const items = products?.filter((item) => item._id === p);
      Products.push(...items);
    });
    const TotalPrice = Products?.reduce((acc, pr) => acc + pr.price, 0);
    return TotalPrice;
  }

  const checkedProducts = {
    userId,
    products: cartState.items,
    eachQuantity: cartState.quantity,
    totalPrice: calTotal(),
  };

  function checkout() {
    if (user.userLoaded) {
      setIsChecking(true);
      setTimeout(() => {
        setIsChecking(false);
        openCheckout();
        closeCart();
        dispatch(check_out_product(checkedProducts));
        dispatch(clearDiscount());
        dispatch(reset_status());
      }, 3000);
    } else {
      toast("Login to complete checkout");
      closeCart();
      router.push("/account/login");
    }
  }

  return (
    <Flex className="flex-col gap-4 px-6 pb-1 self-end">
      <FlexBetween className="bg-softGray p-3 rounded-sm text-black items-center">
        <Paragraph fontPoppins className="font-medium select-none">
          Subtotal:
        </Paragraph>
        <Paragraph
          fontPoppins
          className="font-bold text-lg flex items-center gap-1 select-none"
        >
          <p dangerouslySetInnerHTML={{ __html: nairaSym }} />
          <p>{calTotal()?.toLocaleString()}</p>
        </Paragraph>
      </FlexBetween>
      <FlexBetween className="items-center max-[390px]:flex-wrap gap-3">
        <CustomButton
          variant="secondary"
          className="w-28 p-2 max-[390px]:w-full"
          onClick={() => dispatch(clear_cart())}
        >
          Clear
        </CustomButton>
        <CustomButton
          icon={RiArrowRightLine}
          variant="primary"
          className="w-[250px] p-3 max-[390px]:w-full"
          iconPosition="right"
          onClick={checkout}
          isloading={isChecking}
        >
          Checkout
        </CustomButton>
      </FlexBetween>
    </Flex>
  );
};

export default CartDetails;
