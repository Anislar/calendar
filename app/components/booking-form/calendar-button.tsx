import { AriaButtonProps, useButton } from "@react-aria/button";
import { type CalendarState } from "@react-stately/calendar";
import { useRef } from "react";
import { mergeProps } from "@react-aria/utils";
import { useFocusRing } from "@react-aria/focus";

import { Button } from "@/components/ui/button";
function CalendarButton(
  props: AriaButtonProps<"button"> & {
    state?: CalendarState;
    side?: "left" | "right";
  }
) {
  const ref = useRef(null);
  // provide the event listener for the button
  const { buttonProps } = useButton(props, ref);
  // styles of buttons while focused
  const { focusProps } = useFocusRing();
  return (
    <Button
      variant="outline"
      size="icon"
      ref={ref}
      disabled={props.isDisabled}
      {...mergeProps(buttonProps, focusProps)}
    >
      {props.children}
    </Button>
  );
}

export default CalendarButton;
