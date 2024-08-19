import { Flex } from "@/lib";
import { formatTime } from "@/utils";
import { AreaChart } from "@tremor/react";
import { useEffect } from "react";

const valueFormatter = function (number: number | string | any) {
  return new Intl.NumberFormat("us").format(number).toString();
};

const HistoryChart = ({ header, category, chartData }: EarningsChartType) => {
  const formattedChartData = chartData.map((ch) => ({
    ...ch,
    formattedDate: formatTime(ch.createdAt, "dd MMM, yyyy"),
  }));

  return (
    <>
      <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        {header}
      </h3>

      <AreaChart
        className="mt-4 h-72 chart_cursor"
        data={formattedChartData}
        index="formattedDate"
        yAxisWidth={65}
        categories={category}
        colors={["yellow"]}
        valueFormatter={valueFormatter}
        showAnimation
        animationDuration={1000}
      />
    </>
  );
};

export default HistoryChart;
