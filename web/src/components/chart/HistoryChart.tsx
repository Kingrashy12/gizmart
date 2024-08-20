import { Flex, FlexBetween, HeaderOne } from "@/lib";
import { formatTime } from "@/utils";
import { AreaChart, BadgeDelta } from "@tremor/react";
import { useEffect } from "react";

const valueFormatter = function (number: number | string | any) {
  return new Intl.NumberFormat("us").format(number).toString();
};

const HistoryChart = ({
  header,
  category,
  chartData,
  ...props
}: EarningsChartType) => {
  const formattedChartData = chartData.map((ch) => ({
    ...ch,
    formattedDate: formatTime(ch.createdAt, "dd MMM, yyyy"),
  }));

  const { product } = props;

  const getPercentage = () => {
    if (product?.formalPrice) {
      const New: any = product.price;
      const old = product.formalPrice;
      const res = New - old;
      const percentage = (res / old) * 100;
      const inc = percentage >= 1;

      return (
        <BadgeDelta
          deltaType={inc ? "moderateIncrease" : "moderateDecrease"}
          isIncreasePositive={true}
          size="sm"
          className=""
        >
          {inc ? "+" : null}
          {percentage.toFixed(1)}%
        </BadgeDelta>
      );
    }
  };

  return (
    <>
      <FlexBetween>
        <HeaderOne
          fontPoppins
          className="text-tremor-content dark:text-dark-tremor-content font-semibold text-lg"
        >
          {header}
        </HeaderOne>
        {getPercentage()}
      </FlexBetween>

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
