import { format, formatDate } from "date-fns";

export function formatTime(time: string | Date | any, Format?: string) {
  if (Format) {
    const formatted = format(time, Format);
    return formatted;
  } else {
    const formatted = format(time, "MMMM yyyy");
    return formatted;
  }
}

export function formatToK(value: string | number) {
  let numValue: number;

  if (typeof value === "string") {
    numValue = parseFloat(value);
  } else {
    numValue = value;
  }

  if (numValue >= 1000000) {
    return (numValue / 1000000).toFixed(2) + "M";
  } else if (numValue >= 1000) {
    return (numValue / 1000).toFixed(2) + "K";
  }

  return numValue.toString();
}

export function generateRandomColors(arrayLength: number) {
  const colors = [];

  for (let i = 0; i < arrayLength; i++) {
    const color =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    colors.push(color);
  }

  return colors;
}

export function formatToWeek(date: Date) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (date.getDate() === today.getDate()) {
    return "Today";
  } else if (date.getDate() === yesterday.getDate()) {
    return "Yesterday";
  } else if (
    date.getDate() !== today.getDate() ||
    date.getDate() !== yesterday.getDate()
  ) {
    const day = date.toLocaleDateString("en-us", { weekday: "short" });
    const _date = date.toLocaleDateString("en-us", { day: "2-digit" });
    const month = date.toLocaleDateString("en-us", { month: "short" });

    return `${day} ${_date} ${month}`;
  }
}

export function formatDateBy(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);

  let time: string;

  if (diffInSeconds < 60) {
    time = `${diffInSeconds}s`;
  } else if (diffInMinutes < 60) {
    time = `${diffInMinutes}m`;
  } else if (diffInHours < 24) {
    time = `${diffInHours}h`;
  } else {
    const _date = date.getDate();
    const month = date.toLocaleDateString("en-us", { month: "short" });
    time = `${_date} ${month}`;
  }

  // console.log("date:", { diffInSeconds, diffInMinutes, diffInHours });
  return time;
}
