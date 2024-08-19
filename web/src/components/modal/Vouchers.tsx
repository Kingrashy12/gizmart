import { useBackgroundLoader } from "@/context/useBackgroundLoader";
import { useVouchers } from "@/context/useVouchers";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { Flex, HeaderOne } from "@/lib";
import { getVouchers } from "@/redux/thunks/voucher";
import { Dialog, DialogPanel } from "@tremor/react";
import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import VoucherCard from "../voucher/admin/VoucherCard";

const Vouchers = () => {
  const { isOpen, onClose } = useVouchers();
  const dispatch = useAppDispatch();
  const voucherState = useAppSelector((state) => state.voucher);
  const isfetching = voucherState._all_fetchStatus === "pending";
  const { onClose: closeLoader, onOpen } = useBackgroundLoader();
  const userId = useAppSelector((state) => state.auth.userId);
  const vouchers = voucherState._all;

  useEffect(() => {
    dispatch(getVouchers(userId));
  }, []);

  useEffect(() => {
    if (isfetching) {
      onOpen();
    } else {
      closeLoader();
    }
  }, [isfetching]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="z-[500]">
      <DialogPanel className="p-0">
        <Flex className="flex-col h-[80%] gap-3 text-black">
          <Flex className="p-3 justify-between border-b items-center">
            <HeaderOne fontPoppins className="font-medium text-lg">
              Vouchers
            </HeaderOne>
            <IoClose
              size={30}
              className="p-1 rounded-md hover:bg-neutral-100 cursor-pointer"
            />
          </Flex>
          <Flex className="flex-col gap-3 overflow-y-auto">
            {vouchers.length < 1 ? (
              <HeaderOne className="p-3 items-center flex justify-center">
                No vouchers generated yets
              </HeaderOne>
            ) : (
              vouchers.map((voucher, index) => <VoucherCard key={index} />)
            )}
          </Flex>
        </Flex>
      </DialogPanel>
    </Dialog>
  );
};

export default Vouchers;
