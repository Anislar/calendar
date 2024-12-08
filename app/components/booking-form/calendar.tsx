"use client";
import { useLocale, useCalendar } from "react-aria";
import { useCalendarState } from "react-stately";
import { createCalendar } from "@internationalized/date";
import { CalendarProps, DateValue } from "@react-types/calendar";
import { CalendarHeader } from "./calendar-header";
import CalendarGrid from "./calendar-grid";

function Calendar(props: CalendarProps<DateValue>) {
  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    visibleDuration: {
      months: 1,
    },
    locale,
    createCalendar,
  });
  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(props, state);
  return (
    <div {...calendarProps} className=" inline-block">
      <CalendarHeader
        state={state}
        calendarProps={calendarProps}
        prevCalendarProps={prevButtonProps}
        nextCalendarProps={nextButtonProps}
      />
      <div className="flex gap-8">
        <CalendarGrid state={state} />
      </div>
    </div>
  );
}

export default Calendar;
