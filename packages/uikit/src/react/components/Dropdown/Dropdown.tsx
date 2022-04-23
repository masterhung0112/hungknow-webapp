import React, {
  useCallback,
  useMemo,
  KeyboardEvent,
  MouseEvent,
  useContext,
  useRef,
  useEffect,
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
import { DropdownToggle, isRoleMenu } from "./DropdownToggle";
import { SelectableContext } from "../../context/SelectableContext";
import { usePrevious } from "../../hooks/usePrevious";
import { dataAttr } from "../../utils/dataKey";

export type ToggleEvent =
  | React.SyntheticEvent
  | KeyboardEvent
  | MouseEvent
  | Event;

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
    onSelect, // select the item displayed inside the menu
    onToggle: rawOnToggle, // Hide the menu
    focusFirstItemOnShow,
    navbar: _4,
    autoClose,
    defaultShow,
    children,
    itemSelector = `* [*${dataAttr("dropdown-item")}]`,
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

  const lastShow = usePrevious(show);

  const onSelectCtx = useContext(SelectableContext);
  const lastSourceEvent = useRef<string | null>(null);
  const focusInDropdown = useRef(false);

  // Toggle the display of menu under the dropdown
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

  const handleSelect = useEventCallback(() => {
    (key: string | null, event: React.SyntheticEvent) => {
      // Select the item displayed inside the menu
      onSelect?.(key, event);

      // false: hide the menu
      toggle(false, event, "select");

      if (!event.isPropagationStopped()) {
        onSelectCtx?.(key, event);
      }
    };
  });

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

  if (menuElement && lastShow && !show) {
    focusInDropdown.current = menuElement.contains(
      menuElement.ownerDocument.activeElement
    );
  }

  const focusToggle = useEventCallback(() => {
    if (toggleElement && toggleElement.focus) {
      toggleElement.focus();
    }
  });

  const maybeFocusFirst = useEventCallback(() => {
    const type = lastSourceEvent.current;
    let focusType = focusFirstItemOnShow;

    if (focusType == null) {
      focusType =
        menuRef.current && isRoleMenu(menuRef.current) ? "keyboard" : false;
    }

    if (
      focusType === false ||
      (focusType === "keyboard" && !/^key.+$/.test(type!))
    ) {
      return;
    }

    //TODO: Help
    // const first = qsa(menuRef.current!, itemSelector)[0]
    // if (first && first.focus) first.focus()
  });

  useEffect(() => {
    if (show) {
      maybeFocusFirst();
    } else if (focusInDropdown.current) {
      focusInDropdown.current = false;
      focusToggle();
    }

    // only `show` should be changing
  }, [show, focusInDropdown, focusToggle, maybeFocusFirst]);

  return (
    <SelectableContext.Provider value={handleSelect}>
      <DropdownContext.Provider value={context}>
        {children}
      </DropdownContext.Provider>
    </SelectableContext.Provider>
  );
};

Dropdown.displayName = "Dropdown";

Dropdown.Divider = DropdownDivider;
Dropdown.Item = DropdownItem;
Dropdown.Menu = DropdownMenu;
Dropdown.Header = DropdownHeader;
Dropdown.Toggle = DropdownToggle;
