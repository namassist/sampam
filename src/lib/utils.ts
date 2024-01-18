import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addDays(date: any, days: any) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function daysInMonth(month: any, year: any) {
  return new Date(year, month + 1, 0).getDate();
}

export function dateString(d: Date) {
  const date = new Date(d);

  let options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    weekday: "long",
  } as const;

  const formatted = date.toLocaleDateString("id-ID", options);

  return formatted;
}

export function dateMonth(d: Date) {
  const date = new Date(d);

  let options = {
    day: "2-digit",
    month: "long",
  } as const;

  const formatted = date.toLocaleDateString("id-ID", options);

  return formatted;
}
