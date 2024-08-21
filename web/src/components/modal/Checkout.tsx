import { useBackgroundLoader } from "@/context/useBackgroundLoader";
import { useCheckOutModal } from "@/context/useCheckout";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { Divider, Flex, HeaderOne } from "@/lib";
import { Dialog, DialogPanel } from "@tremor/react";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import OrderSummary from "../products/checkout/OrderSummary";
import VoucherInput from "../products/checkout/VoucherInput";
import PaymentSection from "../products/checkout/PaymentSection";
import CustomButton from "../CustomButton";
import toast from "react-hot-toast";
import { productCheckout } from "@/redux/thunks/order";
import { clear_cart } from "@/redux/cartSlice";
import { useCongrats } from "@/context/useCongrats";
import AddressSection from "../products/checkout/AddressSection";

const Checkout = () => {
  const { onOpen, onClose } = useBackgroundLoader();
  const dispatch = useAppDispatch();
  const orderState = useAppSelector((state) => state.order);
  const voucherState = useAppSelector((state) => state.voucher);
  const is_creating = orderState.createStatus === "pending";
  const { isOpen, onClose: closeCheckOut } = useCheckOutModal();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState<AddressType | any>();
  const { onOpen: openSuccess } = useCongrats();

  function calFee() {
    const fee = orderState.check_out.products.reduce(
      (a, p) => a + p.delivery_fee,
      0
    );
    return fee;
  }

  function calTotal() {
    const fees = calFee();
    if (voucherState.discountedPrice > 0) {
      const totalPrice = voucherState.discountedPrice + fees;

      return totalPrice;
    } else {
      const totalPrice = orderState.check_out.totalPrice + fees;

      return totalPrice;
    }
  }

  useEffect(() => {
    if (is_creating) {
      onOpen();
    } else {
      onClose();
    }
  }, [is_creating]);

  useEffect(() => {
    if (orderState.createStatus === "successful") {
      setTimeout(() => {
        closeCheckOut();
        dispatch(clear_cart());
        openSuccess();
      }, 2000);
    }
  }, [orderState.createStatus]);

  function checkout() {
    dispatch(
      productCheckout({
        userId: orderState.check_out.userId,
        products: orderState.check_out.products,
        eachQuantity: orderState.check_out.eachQuantity,
        totalPrice: calTotal(),
        payment_method: paymentMethod,
        delivery_address: deliveryAddress,
        voucherCode: voucherState.applied,
      })
    );
  }
  return (
    <Dialog open={isOpen} className="z-[500] top-0" onClose={closeCheckOut}>
      <DialogPanel
        className="flex flex-col bg-white p-0 text-black"
        style={{
          background: "white",
          borderStyle: "none",
          borderWidth: 0,
          borderColor: "white",
        }}
      >
        <Flex className="items-center p-3 border-b justify-between">
          <HeaderOne fontPoppins className="text-lg font-semibold">
            Checkout
          </HeaderOne>
          <IoClose
            size={30}
            onClick={closeCheckOut}
            className="cursor-pointer p-1 rounded-md hover:bg-neutral-100"
          />
        </Flex>
        <OrderSummary />
        <VoucherInput />
        <PaymentSection setPaymentMethod={setPaymentMethod} />
        <AddressSection setDeliveryAddress={setDeliveryAddress} />
        <div className="p-3">
          <CustomButton
            variant="primary"
            className="w-full"
            onClick={checkout}
            isloading={is_creating}
          >
            Confirm order
          </CustomButton>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default Checkout;
