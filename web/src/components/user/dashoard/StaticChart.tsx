import EarningChart from "@/components/chart/EarningChart";
import { earningsData } from "@/data/chart";
import { Paragraph, Flex, HeaderOne } from "@/lib";
import React from "react";

const StaticChart = () => {
  return (
    <Flex className="flex-col p-1 bg-chartBg drop-shadow-sm rounded-xl">
      <Flex className="flex-col rounded-xl bg-white p-5 drop-shadow-md">
        <EarningChart
          header="Products  Revenue"
          earned={1312321}
          chartData={earningsData}
          category={["Products", "Income"]}
        />
      </Flex>
    </Flex>
  );
};

export default StaticChart;
