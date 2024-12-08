"use client";
import { cn } from "@/lib/utils";
import { Children, cloneElement, ReactElement } from "react";
import { ButtonProps } from "./button";

interface IButtonProps {
  className?: string;
  children: ReactElement<ButtonProps>[];
}
export function ButtonGroup({ className, children }: IButtonProps) {
  const totalChildren = Children.count(children);
  return (
    <div className={cn("flex w-full", className)}>
      {children.map((child, index) => {
        const isFirstChild = index === 0;
        const isLastChild = index === totalChildren - 1;
        return cloneElement(child, {
          className: cn(
            {
              "rounded-l-none": !isFirstChild,
              "rounded-r-none": !isLastChild,
              "border-l-0": !isFirstChild,
            },
            child.props.className
          ),
        });
      })}
    </div>
  );
}
