import { useGenVoucherModal } from "@/context/useGenVoucher";
import { Divider, Flex, HeaderOne, Paragraph } from "@/lib";
import { Dialog, DialogPanel, NumberInput, Switch } from "@tremor/react";
import React, { useEffect, useState } from "react";
import VoucherForm from "../form/VoucherForm";
import CustomButton from "../CustomButton";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { generateVoucher } from "@/redux/thunks/voucher";
import { useBackgroundLoader } from "@/context/useBackgroundLoader";

const GenerateVoucher = () => {
  const { onClose, isOpen } = useGenVoucherModal();
  const [forAllProducts, setForAllProducts] = useState(true);
  const [hasLimit, setHasLimit] = useState(false);
  const userId = useAppSelector((state) => state.auth.userId);
  const voucherState = useAppSelector((state) => state.voucher);
  const is_generating = voucherState.generate_status === "pending";
  const { onOpen, onClose: closeLoader } = useBackgroundLoader();
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    userId: userId,
    discountAmount: 0,
    expiresAt: Date.now(),
    globalLimit: 0,
    allProducts: forAllProducts,
    hasLimit: hasLimit,
    allowedProducts: [],
    generatorId: userId,
  });

  useEffect(() => {
    setForm({ ...form, hasLimit: hasLimit, allProducts: forAllProducts });
  }, [hasLimit, forAllProducts]);

  useEffect(() => {
    if (is_generating) {
      onOpen();
    } else {
      closeLoader();
    }
  }, [is_generating]);

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e?.target;
    setForm({ ...form, [name]: value });
  }

  const disabledGen = !form.allProducts && form.allowedProducts.length < 1;

  function validateForm() {
    if (form.expiresAt <= Date.now()) {
      toast.error("Please use a valid date for coupon expiry date");
    } else if (form.discountAmount <= 1) {
      toast.error("Plase use a valid discount amount");
    } else if (form.globalLimit < 5) {
      toast.error("Please increase coupon availability");
    } else {
      return true;
    }
  }

  function generateCoupon() {
    if (validateForm()) {
      dispatch(generateVoucher({ ...form }));
      setForm({
        ...form,
        discountAmount: 0,
        expiresAt: Date.now(),
        globalLimit: 0,
        allProducts: true,
        hasLimit: false,
        allowedProducts: [],
      });
    }
  }

  return (
    <Dialog
      onClose={onClose}
      open={isOpen}
      className="flex flex-col items-center justify-center inset-0 h-full top-0 z-[500]"
    >
      <DialogPanel
        className="flex flex-col bg-white rounded-xl"
        style={{
          background: "white",
          borderStyle: "none",
          borderWidth: 0,
          borderColor: "white",
        }}
      >
        <HeaderOne fontPoppins className="font-medium text-lg text-black">
          Generate voucher
        </HeaderOne>
        <Divider />
        <Flex className="flex-col gap-4 mt-3">
          <Flex className="flex-col gap-1">
            <Paragraph fontRoboto className="ml-1 text-sm">
              Global limit
            </Paragraph>
            <NumberInput
              placeholder="Enter global limit"
              value={form.globalLimit}
              name="globalLimit"
              onChange={handleFormChange}
            />
          </Flex>
          <Flex className="items-center gap-2">
            <Paragraph fontPoppins className="text-base text-black font-medium">
              All products
            </Paragraph>
            <Switch
              checked={forAllProducts}
              onClick={() => setForAllProducts(!forAllProducts)}
              color="yellow"
            />
          </Flex>
          <Flex className="items-center gap-2">
            <Paragraph fontPoppins className="text-base text-black font-medium">
              Enable limit
            </Paragraph>
            <Switch
              checked={hasLimit}
              onClick={() => setHasLimit(!hasLimit)}
              color="yellow"
            />
          </Flex>
          <Divider />
          <VoucherForm
            forAllProducts={forAllProducts}
            setForm={setForm}
            form={form}
            handleFormChange={handleFormChange}
          />
          <CustomButton
            variant="primary"
            onClick={generateCoupon}
            disabled={disabledGen}
            isloading={is_generating}
          >
            Generate
          </CustomButton>
        </Flex>
      </DialogPanel>
    </Dialog>
  );
};

export default GenerateVoucher;
