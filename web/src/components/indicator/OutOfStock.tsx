import { Paragraph } from "@/lib";
import React from "react";

const OutOfStock = () => {
  return (
    // <div className="absolute bg-red-500 text-white p-3 w-full flex items-center justify-center z-50">
    <div className="overlay">
      <Paragraph fontPoppins className="font-medium out-of-stock-message">
        Out of stock
      </Paragraph>
    </div>
  );
};

export default OutOfStock;
