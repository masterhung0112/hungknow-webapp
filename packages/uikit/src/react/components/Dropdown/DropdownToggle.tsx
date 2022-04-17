import React, { useCallback, useContext } from "react";
import { useSSRSafeId } from "src/react/hooks/useSSRSafeId";
import { DropdownContext, DropdownContextValue } from "./DropdownContext";

export interface UseDropdownToggleProps {
  id: string;
  ref: DropdownContextValue["setToggle"];
  onClick: React.MouseEventHandler;
  "aria-expanded": boolean;
  "aria-haspopup"?: true;
}

export interface UseDropdownToggleMetadata {
  show: DropdownContextValue["show"];
  toggle: DropdownContextValue["toggle"];
}
export interface DropdownToggleProps {
  children: (
    props: UseDropdownToggleProps,
    meta: UseDropdownToggleMetadata
  ) => React.ReactNode;
}

const noop = () => {};
export const isRoleMenu = (el: HTMLElement) =>
  el.getAttribute("role")?.toLowerCase() === "menu";

export function useDropdownToggle(): [
  UseDropdownToggleProps,
  UseDropdownToggleMetadata
] {
  const id = useSSRSafeId();
  const {
    show = false,
    toggle = noop,
    setToggle,
    menuElement,
  } = useContext(DropdownContext) || {};

  const handleClick = useCallback(
    (e) => {
      toggle(!show, e);
    },
    [show, toggle]
  );

  const props: UseDropdownToggleProps = {
    id,
    ref: setToggle || noop,
    onClick: handleClick,
    "aria-expanded": !!show,
  };

  if (menuElement && isRoleMenu(menuElement)) {
    props["aria-haspopup"] = true;
  }
  return [props, { show, toggle }];
}

export const DropdownToggle: React.FC<DropdownToggleProps> = ({
  children,
}: DropdownToggleProps) => {
  const [props, meta] = useDropdownToggle();

  return <>{children(props, meta)}</>;
};
DropdownToggle.displayName = "DropdownToggle";
