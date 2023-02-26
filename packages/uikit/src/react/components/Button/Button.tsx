import React from "react";
import { AbstractButton, AbstractButtonProps } from "./AbstractButton";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  Omit<AbstractButtonProps, "tagName">;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    return <AbstractButton {...props} ref={ref} />;
  }
);
