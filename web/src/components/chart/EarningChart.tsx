import { Flex } from "@/lib";
import { AreaChart } from "@tremor/react";
import { useEffect } from "react";

const valueFormatter = function (number: number | string | any) {
  return new Intl.NumberFormat("us").format(number).toString();
};

const EarningChart = ({
  header,
  earned,
  category,
  chartData,
}: EarningsChartType) => {
  return (
    <>
      <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        {header}
      </h3>
      <Flex className="items-center gap-1">
        <p className="text-3xl font-medium">₦</p>
        <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
          {earned?.toLocaleString()}
        </p>
      </Flex>
      <AreaChart
        className="mt-4 h-72 chart_cursor"
        data={chartData}
        index="date"
        yAxisWidth={65}
        categories={category}
        colors={["yellow", "blue"]}
        valueFormatter={valueFormatter}
        showAnimation
        animationDuration={1000}
      />
    </>
  );
};

export default EarningChart;
