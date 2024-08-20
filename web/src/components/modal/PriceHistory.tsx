import { Flex } from "@/lib";
import React from "react";
import HistoryChart from "../chart/HistoryChart";

const PriceHistory: React.FC<{
  product: ProductType;
  closeChart: () => void;
}> = ({ product, closeChart, ...props }) => {
  const productPriceHistory = product.priceHistroy;
  return (
    <div
      onClick={closeChart}
      className="bg-[rgb(0,0,0,.5)] fixed flex items-center justify-center w-full h-full inset-0 z-[600]"
    >
      <Flex
        onClick={(e) => e.stopPropagation()}
        className="flex-col p-1 bg-chartBg drop-shadow-sm rounded-xl w-10/12 max-[550px]:w-[90%]"
      >
        <Flex
          onClick={(e) => e.stopPropagation()}
          className="flex-col rounded-xl bg-white p-5 drop-shadow-md"
        >
          <HistoryChart
            chartData={productPriceHistory}
            category={["price"]}
            header="Price history"
            product={product}
          />
        </Flex>
      </Flex>
    </div>
  );
};

export default PriceHistory;
