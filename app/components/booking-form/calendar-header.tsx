import { type CalendarState } from "react-stately";
import { FocusableElement, DOMAttributes } from "@react-types/shared";
import { type AriaButtonProps } from "@react-aria/button";
import { useDateFormatter } from "@react-aria/i18n";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import CalendarButton from "./calendar-button";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface ICalendarHeader {
  state: CalendarState;
  calendarProps: DOMAttributes<FocusableElement>;
  prevCalendarProps: AriaButtonProps<"button">;
  nextCalendarProps: AriaButtonProps<"button">;
}
export function CalendarHeader({
  state,
  calendarProps,
  prevCalendarProps,
  nextCalendarProps,
}: ICalendarHeader) {
  const monthDateFormatter = useDateFormatter({
    month: "short",
    year: "numeric",
    timeZone: state.timeZone,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [monthName, _, year] = monthDateFormatter
    .formatToParts(state.visibleRange.start.toDate(state.timeZone))
    .map((part) => part.value);
  return (
    <div className="flex items-center pb-4">
      <VisuallyHidden>
        <h2>{calendarProps["aria-label"]}</h2>
      </VisuallyHidden>
      <h2 className=" font-semibold flex-1">
        {monthName}
        <span className=" ml-1 text-muted-foreground text-sm font-medium">
          {year}
        </span>
      </h2>
      <div className="flex items-center gap-2">
        <CalendarButton {...prevCalendarProps}>
          <ChevronLeft className="size-4" />
        </CalendarButton>
        <CalendarButton {...nextCalendarProps}>
          <ChevronRight className="size-4" />
        </CalendarButton>
      </div>
    </div>
  );
}
