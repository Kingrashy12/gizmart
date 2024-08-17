import { HeaderOne, Paragraph } from "@/lib";
import React from "react";
import Confetti from "react-confetti";
import { FaCircleCheck } from "react-icons/fa6";
import CustomButton from "../CustomButton";
import { useCongrats } from "@/context/useCongrats";

const Successful = () => {
  const width = global?.window?.innerWidth;
  const height = global?.window?.innerHeight;
  const md = width <= 480;

  const { onClose } = useCongrats();
  return (
    <div className="fixed w-full inset-0 bg-[rgb(0,0,0,.5)] z-[600] flex items-center justify-center h-full">
      <Confetti width={width} height={height} />
      <div className="flex flex-col justify-center items-center w-1/2 max-[720px]:w-[70%] max-[480px]:w-11/12 gap-3 drop-shadow bg-white p-6 rounded-xl">
        <FaCircleCheck size={md ? 50 : 80} className="text-green-500" />
        <HeaderOne fontPoppins className="text-xl font-semibold">
          Thank You!
        </HeaderOne>
        <div className="flex flex-col gap-6 mt-3 justify-center items-center">
          <Paragraph fontPoppins className="font-normal">
            Your order was successfully placed
          </Paragraph>
          <CustomButton variant="secondary" className="w-16/" onClick={onClose}>
            Back
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Successful;
