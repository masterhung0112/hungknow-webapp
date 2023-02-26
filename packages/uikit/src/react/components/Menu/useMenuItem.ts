import React, { useContext } from "react";
import {
  makeEventKey,
  SelectableContext,
} from "../../context/SelectableContext";
import { useEventCallback } from "../../hooks/useEventCallback";
import { dataAttr } from "../../utils/dataKey";
import { EventKey } from "../../types";
import { NavContext } from "../Nav/NavContext";

export interface UseMenuItemOptions {
  key?: EventKey | null;
  href?: string;
  active?: boolean;
  disabled?: boolean;

  // Allow the menu item to have its own click handler
  // The SelectableContext also receive the onClick callback
  onClick?: React.MouseEventHandler;

  label?: React.ReactNode
}

export function useMenuItem({
  key,
  href,
  active,
  disabled,
  onClick,
}: UseMenuItemOptions) {
  const onSelectCtx = useContext(SelectableContext);

  // Fetch activeKey from Dropdown.Menu
  const { activeKey } = useContext(NavContext) || {};
  const eventKey = makeEventKey(key, href);

  // Compare the activeKey with this item's key
  const isActive =
    active === null && key !== null
      ? makeEventKey(activeKey) === eventKey
      : active;

  const handleClick = useEventCallback((event) => {
    if (disabled) return;

    onClick?.(event);

    if (onSelectCtx && !event.isPropagationStopped()) {
      onSelectCtx(eventKey, event);
    }
  });

  return [
    {
      onClick: handleClick,
      "aria-disabled": disabled || undefined,
      "aria-selected": isActive,
      [dataAttr("dropdown-item")]: "",
    },
    { isActive },
  ] as const;
}
