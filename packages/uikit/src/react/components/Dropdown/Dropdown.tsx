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

export const DropdownComponent: DropdownComponentType = () => {
  return <div>hello</div>;
};

DropdownComponent.Divider = DropdownDivider;
DropdownComponent.Item = DropdownItem;
DropdownComponent.Menu = DropdownMenu;
DropdownComponent.Header = DropdownHeader;
