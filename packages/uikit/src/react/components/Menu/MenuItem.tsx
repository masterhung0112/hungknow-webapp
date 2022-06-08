import clsx from "clsx";
import React, { PropsWithChildren } from "react";
import { ActionProps } from "../../common/ActionProps";
import {
  ACTIVE,
  DISABLED,
  MENU_ITEM,
  MENU_ITEM_ICON,
  MENU_SUBMENU_ICON,
} from "../../common/cssClasses";
import { LinkProps } from "../../common/LinkProps";
import { EventKey } from "../../types";
import { Icon } from "../Icon";
import { useMenuItem } from "./useMenuItem";

export interface MenuItemProps extends ActionProps, LinkProps {
  as?: React.ElementType;
  active?: boolean;
  disabled?: boolean;
  eventKey?: EventKey;
  href?: string;
}

/*
 Clickable menu item.
 This component mainly support:
 - Icon at the left
 - Text to the right of the icon
 - Label/icon at the right
 */
export const MenuItem = ({
  eventKey,
  disabled,
  onClick,
  active,
  as = 'li',
  icon,
  text,
  children,
  ...props
}: PropsWithChildren<MenuItemProps>) => {
  const [menuItemProps, menuItemMeta] = useMenuItem({
    key: eventKey,
    href: props.href,
    disabled,
    onClick,
    active,
  });

  const classes = clsx(
    MENU_ITEM,
    menuItemMeta.isActive && ACTIVE,
    disabled && DISABLED
  );

  return React.createElement(
    as,
    {
      ...menuItemProps,
      ...props,
      className: classes,
    },
    icon ? (
      <span className={MENU_ITEM_ICON}>
        {/* tabIndex: not allow user to select the icon */}
        <Icon icon={icon} aria-hidden={true} tabIndex={-1} />
      </span>
    ) : undefined,
    <span>{text}</span>,
    children != null ? (
      <Icon className={MENU_SUBMENU_ICON} icon="caret-right" />
    ) : undefined,
    children
  );
};
MenuItem.displayName = "MenuItem";
