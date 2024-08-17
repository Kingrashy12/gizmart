import CustomButton from "@/components/CustomButton";
import { useBackgroundLoader } from "@/context/useBackgroundLoader";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { Flex, FlexBetween } from "@/lib";
import { ApplyVoucher } from "@/redux/thunks/voucher";
import { RiCoupon3Fill } from "@remixicon/react";
import { TextInput } from "@tremor/react";
import React, { useEffect, useState } from "react";
import { MdConfirmationNumber } from "react-icons/md";

const VoucherInput = () => {
  const orderState = useAppSelector((state) => state.order);
  const checkedOrder = orderState.check_out;
  const userId = useAppSelector((state) => state.auth.userId);
  const [code, setCode] = useState("");
  const dispatch = useAppDispatch();
  const voucherState = useAppSelector((state) => state.voucher);
  const is_validating = voucherState.validateStatus === "pending";
  const has_error = voucherState.validateStatus === "failed";
  const { onClose, onOpen } = useBackgroundLoader();

  function getCol() {
    const collection = checkedOrder.products.map(
      (product) => product.collection
    );

    return collection;
  }

  const collection = getCol();

  useEffect(() => {
    if (is_validating) {
      onOpen();
    } else {
      onClose();
    }
  }, [is_validating]);

  function apply() {
    dispatch(
      ApplyVoucher({ code, userId, price: checkedOrder.totalPrice, collection })
    );
  }
  function onKeyApply(e: React.KeyboardEvent) {
    if (code && e.key === "Enter") {
      dispatch(
        ApplyVoucher({
          code,
          userId,
          price: checkedOrder.totalPrice,
          collection,
        })
      );
    }
  }
  return (
    <Flex className="flex-col gap-3 border-t border-b">
      <FlexBetween className="p-3 gap-2 items-center">
        <TextInput
          // icon={RiCoupon3Fill}
          icon={MdConfirmationNumber}
          placeholder="Have a voucher code? Enter"
          className=""
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyUp={onKeyApply}
        />
        <CustomButton
          variant="primary"
          disabled={is_validating || !code}
          onClick={apply}
          isloading={is_validating}
        >
          Apply
        </CustomButton>
      </FlexBetween>
    </Flex>
  );
};

export default VoucherInput;
