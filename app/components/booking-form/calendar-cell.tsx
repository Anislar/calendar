import { useRef } from "react";
import { useCalendarCell, useFocusRing, mergeProps } from "react-aria";
import { type CalendarState } from "@react-stately/calendar";
import {
  CalendarDate,
  isToday,
  getLocalTimeZone,
  isSameMonth,
} from "@internationalized/date";
import { cn } from "@/lib/utils";

interface ICalendarCell {
  state: CalendarState;
  date: CalendarDate;
  currentMonth: CalendarDate;
  isUnavailable?: boolean;
}
export function CalendarCell({
  state,
  date,
  currentMonth,
  isUnavailable,
}: ICalendarCell) {
  const ref = useRef(null);
  const { cellProps, buttonProps, isSelected, isDisabled, formattedDate } =
    useCalendarCell({ date }, state, ref);
  const { focusProps, isFocusVisible } = useFocusRing();
  const isDateToday = isToday(date, getLocalTimeZone());
  const isOutsideMonth = !isSameMonth(currentMonth, date);
  const isTodayIsDisabled = isDisabled || isUnavailable;

  return (
    <td
      {...cellProps}
      className={`py-0.5 px-0.5 relative ${isFocusVisible ? "z-10" : "z-0"} `}
    >
      <div
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        hidden={isOutsideMonth}
        className="size-10 sm:size-12 outline-none group rounded-md"
      >
        <div
          className={cn(
            "size-full rounded-sm flex items-center justify-center text-sm font-semibold",
            isSelected ? "bg-primary text-white" : "",
            isTodayIsDisabled
              ? " text-muted-foreground cursor-not-allowed"
              : "",
            !isSelected && !isTodayIsDisabled ? " bg-secondary" : ""
          )}
        >
          {formattedDate}
          {!!isDateToday && (
            <div
              className={cn(
                "absolute  bottom-3 left-1/2 transform -translate-x-1/2 translate-y-1/2 size-1.5 bg-primary rounded-full",
                isSelected && "bg-white"
              )}
            />
          )}
        </div>
      </div>
    </td>
  );
}
