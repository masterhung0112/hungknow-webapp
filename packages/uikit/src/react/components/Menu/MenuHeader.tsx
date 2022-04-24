import clsx from "clsx";
import React from "react";
import { MENU_HEADER } from "../../common/cssClasses";

export interface MenuHeaderProps {
  as?: React.ElementType;
  text: string;
}
export function MenuHeader({
  as = "li",
  text,
  ...htmlProps
}: MenuHeaderProps) {
  const classes = clsx(MENU_HEADER);
  return React.createElement(
    as,
    { className: classes, ...htmlProps },
    <span><h4>{text}</h4></span>,
  );
}
