import { DateRangeType } from "../types";

function form_date_range(range: DateRangeType) {
  const startDate = new Date(range.from);
  const endDate = new Date(range.to);

  const startDay = startDate.getDate();
  const startMonth = startDate.toLocaleString("default", { month: "long" });

  const endDay = endDate.getDate();
  const endMonth = endDate.toLocaleString("default", { month: "long" });

  let formattedDateRange;

  if (startMonth === endMonth) {
    formattedDateRange = `${startDay}-${endDay} ${startMonth}`;
  } else {
    formattedDateRange = `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
  }

  return formattedDateRange;
}

export default form_date_range;
