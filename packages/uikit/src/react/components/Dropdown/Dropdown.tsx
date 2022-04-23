import React, {
  useCallback,
  useMemo,
  KeyboardEvent,
  MouseEvent,
} from "react";
import { useUncontrolled, useUncontrolledProp } from "uncontrollable";
import { DropdownContext, DropdownContextValue } from "./DropdownContext";
import { DropdownDivider } from "./DropdownDivider";
import { DropdownHeader } from "./DropdownHeader";
import { DropdownItem } from "./DropdownItem";
import { DropdownMenu } from "./DropdownMenu";
import { useEventCallback } from "../../hooks/useEventCallback";
import { Placement } from "../Popper/usePopper";
import { SelectCallback } from "../../types";
import { useRefWithUpdate } from "../../hooks/useRefWithUpdate";
import { DropdownToggle } from "./DropdownToggle";

export type ToggleEvent = React.SyntheticEvent | KeyboardEvent | MouseEvent | Event;

export interface ToggleMetadata {
  source: string | undefined;
  originalEvent: ToggleEvent | undefined;
}

export interface DropdownProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect" | "children"> {
  //as: ElementType
  //align?: AlignType
  placement?: Placement;
  defaultShow?: boolean;
  show?: boolean;
  onSelect?: SelectCallback;
  onToggle?: (nextShow: boolean, meta: ToggleMetadata) => void;
  itemSelector?: string;
  focusFirstItemOnShow?: boolean | "keyboard";
  children?: React.ReactNode;
  navbar?: boolean;
  autoClose?: boolean | "outside" | "inside";
}

type DropdownComponentType = React.FC<DropdownProps> & {
  Divider: typeof DropdownDivider;
  Item: typeof DropdownItem;
  Menu: typeof DropdownMenu;
  Header: typeof DropdownHeader;
  Toggle: typeof DropdownToggle;
};

export const Dropdown: DropdownComponentType = (pProps) => {
  const {
    //as: Component = 'div',
    //drop,
    placement = "bottom-start",
    show: rawShow,
    className,
    //align,
    onSelect,
    onToggle: rawOnToggle,
    focusFirstItemOnShow,
    navbar: _4,
    autoClose,
    defaultShow,
    children,
    // ...props
  } = useUncontrolled(pProps, { show: "onToggle" });

  const [show, onToggle] = useUncontrolledProp(
    rawShow,
    defaultShow!,
    rawOnToggle
  );

  // We use normal refs instead of useCallbackRef in order to populate the
  // the value as quickly as possible, otherwise the effect to focus the element
  // may run before the state value is set
  const [menuRef, setMenu] = useRefWithUpdate<HTMLElement>();
  const menuElement = menuRef.current;

  const [toggleRef, setToggle] = useRefWithUpdate<HTMLElement>();
  const toggleElement = toggleRef.current;

  const toggle = useCallback(
    (
      nextShow: boolean,
      event?: ToggleEvent,
      source: string | undefined = event?.type
    ) => {
      onToggle(nextShow, { originalEvent: event, source });
    },
    [onToggle]
  );

  const isClosingPermitted = (source: string): boolean => {
    if (autoClose === false) return source === "click";

    if (autoClose === "inside") return source !== "rootClose";
    if (autoClose === "outside") return source !== "select";

    return true;
  };

  const handleToggle = useEventCallback(
    (nextShow: boolean, meta: ToggleMetadata) => {
      if (
        (meta.originalEvent!.currentTarget as any) === document &&
        (meta.source !== "keydown" ||
          (meta.originalEvent as any).key === "Escape")
      ) {
        meta.source = "rootClose";
      }

      if (isClosingPermitted(meta.source!)) {
        onToggle?.(nextShow, meta);
      }
    }
  );

  const context: DropdownContextValue = useMemo(
    () => ({
      toggle,
      placement,
      show,
      menuElement,
      toggleElement,
      setMenu,
      setToggle,
    }),
    [toggle, placement, show, menuElement, toggleElement, setMenu, setToggle]
  );

  return (
    <DropdownContext.Provider value={context}>
      {children}
    </DropdownContext.Provider>
  );
};

Dropdown.displayName = "Dropdown";

Dropdown.Divider = DropdownDivider;
Dropdown.Item = DropdownItem;
Dropdown.Menu = DropdownMenu;
Dropdown.Header = DropdownHeader;
Dropdown.Toggle = DropdownToggle;
