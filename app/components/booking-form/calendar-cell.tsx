import { useRef } from "react";
import { useCalendarCell, useFocusRing, mergeProps } from "react-aria";
import { type CalendarState } from "@react-stately/calendar";
import { CalendarDate } from "@internationalized/date";
import { cn } from "@/lib/utils";

interface ICalendarCell {
  state: CalendarState;
  date: CalendarDate;
  currentMonth: CalendarDate;
}
export function CalendarCell({ state, date, currentMonth }: ICalendarCell) {
  const ref = useRef(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    formattedDate,
  } = useCalendarCell({ date }, state, ref);
  const { focusProps, isFocusVisible } = useFocusRing();
  return (
    <td
      {...cellProps}
      className={`py-0.5 px-0.5 relative ${isFocusVisible ? "z-10" : "z-0"} `}
    >
      <div
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className="size-10 outline-none group rounded-md"
      >
        <div
          className={cn(
            "size-full rounded-sm flex items-center justify-center text-sm font-semibold",
            isSelected ? "bg-primary text-white" : ""
          )}
        >
          {formattedDate}
        </div>
      </div>
    </td>
  );
}
