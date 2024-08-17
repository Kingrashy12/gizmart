import { Flex } from "@/lib";
import React from "react";
import StatisticChart from "@/components/chart/StatisticChart";
import { salesdata } from "@/data/chart";
import { generateRandomColors } from "@/utils";

const EachStatistic = () => {
  return (
    <div className="flex-col p-1 bg-chartBg drop-shadow-sm rounded-xl flex w-auto h-full">
      <div className="flex-col rounded-xl bg-white p-5 drop-shadow-md flex w-auto h-full">
        <StatisticChart
          chartData={salesdata}
          category="sales"
          categories={salesdata.map((c) => c.name)}
          //   colors={generateRandomColors(salesdata.length)}
        />
      </div>
    </div>
  );
};

export default EachStatistic;
