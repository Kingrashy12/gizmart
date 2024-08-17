import { useSellProductModal } from "@/context/useSell";
import { Divider, Flex, FlexBetween, HeaderOne, Paragraph } from "@/lib";
import { Dialog, DialogPanel, Switch } from "@tremor/react";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import CollectionSection from "../form/sell/CollectionSection";
import SecondSection from "../form/sell/SecondSection";
import ThirdSection from "../form/sell/ThirdSection";
import Desc_Section from "../form/sell/Desc_Section";
import CustomButton from "../CustomButton";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IconWrap } from "..";
import { MdOutlineCircle } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { createProduct } from "@/redux/thunks/product";
import { useBackgroundLoader } from "@/context/useBackgroundLoader";
import { Appcolors } from "@/styles/global";

const SellProductModal = () => {
  const { onClose, isOpen } = useSellProductModal();
  const { onOpen: openLoader, onClose: closeLoader } = useBackgroundLoader();
  const [isAvailable, setIsAvailable] = useState(false);
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const productState = useAppSelector((state) => state.product);
  const isCreating = productState.createStatus === "pending";
  const [isDeliveryFree, setIsDeliveryFree] = useState(true);
  const [form, setForm] = useState({
    userId: authState.userId,
    subcategory: "",
    category: "",
    color: "",
    price: 0,
    name: "",
    description: "",
    brand: "",
    quantity: 0,
    images: [],
    delivery_fee: 0,
  });

  useEffect(() => {
    if (isCreating) {
      openLoader();
    } else {
      closeLoader();
    }
  }, [isCreating]);

  function sell() {
    dispatch(createProduct(form));
    setForm({
      ...form,
      name: "",
      description: "",
      brand: "",
      color: "",
      subcategory: "",
      price: 0,
      quantity: 0,
      images: [],
      category: "",
      delivery_fee: 0,
    });
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="inset-0 top-0 h-full z-[600]"
    >
      <DialogPanel className="flex flex-col p-0">
        <Flex className="h-full flex-col">
          <FlexBetween className="p-3 border-b border-b-neutral-300 items-center drop-shadow">
            <HeaderOne fontPoppins className="text-black font-semibold text-xl">
              Sell
            </HeaderOne>
            <IoClose
              size={35}
              onClick={onClose}
              className="text-white cursor-pointer p-2 bg-black rounded-full hover:opacity-75"
            />
          </FlexBetween>
          <Flex className="flex-col gap-3 overflow-y-auto h-[400px] p-4">
            <CollectionSection
              form={form}
              setForm={setForm}
              isCreating={isCreating}
            />
            <SecondSection
              form={form}
              setForm={setForm}
              isCreating={isCreating}
            />
            <ThirdSection form={form} setForm={setForm} />
            <Desc_Section
              form={form}
              setForm={setForm}
              isCreating={isCreating}
              isDeliveryFree={isDeliveryFree}
            />
            <Divider className="border-b-neutral-200" />
            <Flex className="gap-1 items-center">
              <Paragraph
                fontPoppins
                className="font-semibold text-black text-sm"
              >
                Free delivery
              </Paragraph>
              <Switch
                color="yellow"
                checked={isDeliveryFree}
                onChange={() => setIsDeliveryFree(!isDeliveryFree)}
              />
            </Flex>
            <Divider className="border-b-neutral-200" />
            <Flex className="items-center gap-1">
              <IconWrap
                Icon={isAvailable ? IoIosCheckmarkCircle : MdOutlineCircle}
                size={25}
                className="text-primaryColor cursor-pointer"
                onClick={() => setIsAvailable(!isAvailable)}
              />
              <Paragraph fontPoppins className="text-sm font-medium text-black">
                Please confirm that the product is available for sale.
              </Paragraph>
            </Flex>
          </Flex>
          <Flex className="bg-white p-2 rounded-b-lg">
            <CustomButton
              disabled={!isAvailable || isCreating}
              isloading={isCreating}
              variant="primary"
              onClick={sell}
              className="w-full"
            >
              Sell
            </CustomButton>
          </Flex>
        </Flex>
      </DialogPanel>
    </Dialog>
  );
};

export default SellProductModal;
