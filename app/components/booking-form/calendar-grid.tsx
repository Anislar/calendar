import { useCalendarGrid, useLocale } from "react-aria";
import {
  DateDuration,
  getWeeksInMonth,
  endOfMonth,
} from "@internationalized/date";
import { type CalendarState } from "@react-stately/calendar";
import { CalendarCell } from "./calendar-cell";

interface ICalendarGrid {
  state: CalendarState;
  offset?: DateDuration;
}
function CalendarGrid({ state, offset = {} }: ICalendarGrid) {
  const startDate = state.visibleRange.start.add(offset);
  const endDate = endOfMonth(startDate);
  let { locale } = useLocale();
  let { gridProps, headerProps, weekDays } = useCalendarGrid(
    {
      startDate,
      endDate,
      weekdayStyle: "short",
    },
    state
  );

  // Calculate the number of weeks in the month to determine the number of rows in the grid table.
  const weeksInMonth = getWeeksInMonth(startDate, locale);
  return (
    <table {...gridProps} cellPadding={0} className="flex-1">
      <thead {...headerProps} className="text-sm font-medium">
        <tr>
          {weekDays.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell
                    currentMonth={startDate}
                    key={i}
                    state={state}
                    date={date}
                  />
                ) : (
                  <td key={i} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CalendarGrid;