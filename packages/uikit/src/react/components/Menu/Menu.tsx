import React from "react";
import clsx from "clsx";
import { useMenu, UseMenuOptions } from "./useMenu";
import { LARGE, MENU } from "../../common/cssClasses";
import { Props } from "../../common/Props";

export interface MenuProps extends Props, UseMenuOptions {
  as?: React.ElementType;
  large?: boolean;
}

export const Menu: React.FC<MenuProps> = ({
  as = "ul",
  children,
  large,
  className,
  ...options
}) => {
  const { menuProps, menuMetadata } = useMenu(options);

  const classes = clsx(
    MENU, 
    large && LARGE, 
    className
  );

  return React.createElement(
    as,
    {
      ...menuProps,
      className: classes,
      style: {
        visibility: menuMetadata.show ? "visible" : "hidden",
      },
    },
    children
  );
};
Menu.displayName = "Menu";
