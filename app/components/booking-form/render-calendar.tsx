"use client";

import Calendar from "./calendar";
import { today, getLocalTimeZone } from "@internationalized/date";
import { DateValue } from "@react-types/calendar";

interface IRenderCalendar {
  availibility:
    | {
        day: string;
        isActive: boolean;
      }[]
    | undefined;
}
function RenderCalendar({ availibility }: IRenderCalendar) {
  // Helper function to check if a given date is unavailable.
  const isDateUnavailable = (date: DateValue) => {
    const dayOfWeek = date.toDate(getLocalTimeZone()).getDay();
    const adjustedIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    return !availibility?.[adjustedIndex]?.isActive;
  };
  return (
    <Calendar
      minValue={today(getLocalTimeZone())}
      isDateUnavailable={isDateUnavailable}
    />
  );
}

export default RenderCalendar;
