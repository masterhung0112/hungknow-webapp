import React from "react";
import { DropdownDivider } from "./DropdownDivider";
import { DropdownHeader } from "./DropdownHeader";
import { DropdownItem } from "./DropDownItem";
import { DropdownMenu } from "./DropdownMenu";

type DropdownComponentType = React.FC & {
  Divider: typeof DropdownDivider;
  Item: typeof DropdownItem;
  Menu: typeof DropdownMenu;
  Header: typeof DropdownHeader;
};

export interface DropdownProps {
  navbar?: boolean
}
export const DropdownComponent: DropdownComponentType = React.forwardRef<HTMLElement, DropdownProps>(props, ref) => {
  const Component = 'div'
  // render lables
  // render text
  // render icon
  // render menu
  return <Component ref={ref}>hello</Component>;
};

DropdownComponent.displayName = 'Dorpdown'

DropdownComponent.Divider = DropdownDivider;
DropdownComponent.Item = DropdownItem;
DropdownComponent.Menu = DropdownMenu;
DropdownComponent.Header = DropdownHeader;
