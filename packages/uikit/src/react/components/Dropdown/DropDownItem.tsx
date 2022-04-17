import React, { useContext } from "react";
import {
  makeEventKey,
  SelectableContext,
} from "../../context/SelectableContext";
import { useEventCallback } from "../../hooks/useEventCallback";
import { dataAttr } from "../../utils/dataKey";
import { EventKey } from "../../types";
import { NavContext } from "../Nav/NavContext";
import { AnchorButton } from "../Button/AnchorButton";

export interface DropdownItemProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  active?: boolean;
  disabled?: boolean;
  eventKey?: EventKey;
  href?: string;
}

export interface UseDropdownItemOptions {
  key?: EventKey | null;
  href?: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
}

export function useDropdownItem({
  key,
  href,
  active,
  disabled,
  onClick,
}: UseDropdownItemOptions) {
  const onSelectCtx = useContext(SelectableContext);
  const navContext = useContext(NavContext);

  const { activeKey } = navContext || {};
  const eventKey = makeEventKey(key, href);

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

export const DropdownItem = React.forwardRef<
  typeof AnchorButton,
  DropdownItemProps
>(
  (
    {
      eventKey,
      disabled,
      onClick,
      active,
      as: Component = AnchorButton,
      ...props
    },
    ref
  ) => {
    const [dropdownItemProps] = useDropdownItem({
      key: eventKey,
      href: props.href,
      disabled,
      onClick,
      active,
    });
    return <Component {...props} ref={ref} {...dropdownItemProps} />;
  }
);
