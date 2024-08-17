import { Divider } from "@/lib";
import { DonutChart, Legend } from "@tremor/react";

const valueFormatter = (number: number) =>
  `₦ ${Intl.NumberFormat("us").format(number).toString()}`;

const StatisticChart = ({
  chartData,
  colors,
  categories,
  category,
}: DonutChartType) => {
  return (
    <>
      <div className="flex items-center justify-center space-x-6 flex-col h-[350px] gap-3">
        <DonutChart
          data={chartData}
          category={category}
          index="name"
          valueFormatter={valueFormatter}
          colors={colors}
          className="w-40"
          showAnimation
          animationDuration={1000}
        />
        <Divider />
        <Legend categories={categories} colors={colors} className="max-w-xs" />
      </div>
    </>
  );
};

export default StatisticChart;
