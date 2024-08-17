import CustomButton from "@/components/CustomButton";
import { useAppDispatch } from "@/hooks/store";
import { Flex, HeaderOne } from "@/lib";
import { confirmOrder } from "@/redux/thunks/order";
import { DateRangePicker, Dialog, DialogPanel } from "@tremor/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ConfirmRelease: React.FC<{
  order: OrderType;
  open: boolean;
  closeDialog: () => void;
}> = ({ order, open, closeDialog }) => {
  const [estimated, setEstimated] = useState({ from: "", to: "" });
  const dispatch = useAppDispatch();

  function handleDate(value: any) {
    const from = value.from;
    const to = value.to;
    setEstimated({ ...estimated, from: from, to: to });
    console.log("date:", { from, to });
  }

  function confirm() {
    if (!estimated.to || !estimated.from) {
      toast.error("Please select a date valid range");
    } else {
      dispatch(confirmOrder({ orderId: order._id, estimateddate: estimated }));
      setEstimated({ ...estimated, from: "", to: "" });
    }
  }

  return (
    <Dialog className="z-[600]" open={open} onClose={closeDialog}>
      <DialogPanel>
        <Flex className="flex-col gap-7">
          <HeaderOne fontPoppins className="text-black font-semibold text-lg">
            When is the estimated delivery?
          </HeaderOne>
          <DateRangePicker
            className="top-0"
            onChange={handleDate}
            onValueChange={handleDate}
          />
          <CustomButton
            variant="primary"
            disabled={!estimated.from || !estimated.to}
            onClick={confirm}
          >
            Release
          </CustomButton>
        </Flex>
      </DialogPanel>
    </Dialog>
  );
};

export default ConfirmRelease;
