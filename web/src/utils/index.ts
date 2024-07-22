import { format } from "date-fns";

export function formatTime(time: string | Date | any) {
  const formatted = format(time, "MMMM dd");
  return formatted;
}
