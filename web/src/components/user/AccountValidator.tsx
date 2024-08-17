import { SellOnGiz } from "@/assets";
import { Flex, StaticImage, Paragraph } from "@/lib";
import React, { useEffect, useState } from "react";
import CustomButton from "../CustomButton";
import { RiArrowUpCircleLine } from "@remixicon/react";
import BackgroundLoader from "../loader/BackgroundLoader";
import Check from "../indicator/Check";
import { useBackgroundLoader } from "@/context/useBackgroundLoader";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { upgradeToSeller } from "@/redux/thunks/auth";
import { useSellProductModal } from "@/context/useSell";

const AccountValidator = () => {
  const [checked, setChecked] = useState(false);
  const { onOpen, onClose } = useBackgroundLoader();
  const authState = useAppSelector((state) => state.auth);
  const isupgrading = authState.upgradeStatus === "pending";
  const dispatch = useAppDispatch();
  const userId = authState.userId;
  const { onOpen: openSell } = useSellProductModal();

  useEffect(() => {
    if (isupgrading) {
      onOpen();
    } else {
      onClose();
    }
  }, [isupgrading]);

  useEffect(() => {
    if (authState.isSeller) {
      openSell();
    }
  }, [authState.isSeller]);

  function upgradeAcc() {
    dispatch(upgradeToSeller(userId));
  }
  return (
    <Flex className="flex-col gap-3 items-center justify-center">
      <StaticImage
        alt="Sell on gizmart"
        className="w-[100px]"
        src={SellOnGiz}
      />
      <Paragraph
        fontPoppins
        className="font-medium text-base text-black text-center/"
      >
        Please consider upgrading your account to start selling on{" "}
        <span className="text-primaryColor">Gizmart</span>
      </Paragraph>
      <Flex className="gap-1 items-center">
        <Check isChecked={checked} setIsChecked={() => setChecked(!checked)} />
        <Paragraph fontPoppins className="text-black font-medium text-sm">
          I have read and agreed to the sell{" "}
          <span className="hover:underline cursor-pointer text-blue-500">
            policy
          </span>
        </Paragraph>
      </Flex>
      <CustomButton
        disabled={!checked || isupgrading}
        isloading={isupgrading}
        variant="primary"
        icon={RiArrowUpCircleLine}
        onClick={upgradeAcc}
      >
        Upgrade
      </CustomButton>
    </Flex>
  );
};

export default AccountValidator;
