import React from "react";
import { AbstractButton, AbstractButtonProps } from "./AbstractButton";
import { AnchorOptions } from "./useButtonProps";

export type AnchorButtonProps = AnchorOptions &
  React.AnchorHTMLAttributes<HTMLAnchorElement> &
  Omit<AbstractButtonProps, "tagName">;

export const AnchorButton = React.forwardRef<
  HTMLAnchorElement,
  AnchorButtonProps
>(({ disabled, href, ...props }, ref) => {
  return (
    <AbstractButton href={disabled ? undefined : href} {...props} ref={ref} />
  );
});
