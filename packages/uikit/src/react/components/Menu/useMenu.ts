import { useContext, useRef } from "react";
import { useCallbackRef } from "../../hooks/useCallbackRef";
import {
  ClickOutsideOptions,
  useClickOutside,
} from "../../hooks/useClickOutside";
import { mergeOptionsWithPopperConfig } from "../Popper/mergeOptionsWithPopperConfig";
import {
  Offset,
  Placement,
  usePopper,
  UsePopperOptions,
  UsePopperState,
} from "../Popper/usePopper";
import { DropdownContext, DropdownContextValue } from "../Dropdown/DropdownContext";
import { ChildrenFn } from "../../utils/isChildrenFn";
import { noop } from "../../utils/noop";

export interface UseMenuOptions {
  key?: string;

  // Allowing the Dropdown to automatically adjust its placement in case of overlap with the viewport
  flip?: boolean;
  // Controls the visible state of menu
  show?: boolean;
  fixed?: boolean;

  placement?: Placement;

  // Whether or not to use Popper for positioning the menu
  usePopper?: boolean;

  // Whether or not to add scroll and resize listeners to update menu position
  enableEventListeners?: boolean;

  offset?: Offset;

  // Override the default event used by RootCloseWrapper
  rootCloseEvent?: ClickOutsideOptions["clickTrigger"];

  // Popper options and props passed directly to react-popper's Popper component
  popperConfig?: Omit<UsePopperOptions, "enabled" | "placement">;
}

export type UserMenuArrowProps = Record<string, any> & {
  ref: React.RefCallback<HTMLElement>;
  style: React.CSSProperties;
};

export interface UseMenuMetadata {
  show: boolean;
  placement?: Placement;
  hasShown: boolean;
  toggle?: DropdownContextValue["toggle"];
  popper: UsePopperState | null;
  arrowProps: Partial<UserMenuArrowProps>;
}
export type UserMenuProps = Record<string, any> & {
  key?: string;
  ref: React.RefCallback<HTMLElement>;
  style?: React.CSSProperties;
  "aria-labelledby"?: string;
};

export const useMenu = (options: UseMenuOptions = {}) => {
  // Menu can be embedded inside the dropdown
  const dropdownContext = useContext(DropdownContext);
  const hasShownRef = useRef(false);
  const show = dropdownContext && dropdownContext.show !== null ? dropdownContext.show : !!options.show;

  if (show && !hasShownRef.current) {
    hasShownRef.current = true;
  }

  const [arrowElement, attachArrowRef] = useCallbackRef<Element>();

  const {
    key,
    flip,
    offset,
    rootCloseEvent,
    fixed = false,
    placement: placementOverride,
    popperConfig = {},
    enableEventListeners = true,
    usePopper: shouldUsePopper = !!dropdownContext,
  } = options;

  const handleClose = (e: React.SyntheticEvent | Event) => {
    dropdownContext?.toggle(false, e);
  };

  const { setMenu, menuElement, placement, toggleElement } = dropdownContext || {};

  const popper = usePopper(
    toggleElement,
    menuElement,
    mergeOptionsWithPopperConfig({
      placement: placementOverride || placement || "bottom-start",
      enabled: shouldUsePopper,
      enableEvents: enableEventListeners === null ? show : enableEventListeners,
      offset,
      flip,
      fixed,
      arrowElement,
      popperConfig,
    })
  );

  const menuProps: UserMenuProps = {
    key: key,
    ref: setMenu || noop,
    "aria-labelledby": toggleElement?.id,
    ...popper.attributes.popper,
    style: popper.styles.popper as any,
  };

  const menuMetadata: UseMenuMetadata = {
    show,
    placement,
    hasShown: hasShownRef.current,
    toggle: dropdownContext?.toggle,
    popper: shouldUsePopper ? popper : null,
    arrowProps: shouldUsePopper
      ? {
          ref: attachArrowRef,
          ...popper.attributes.arrow,
          style: popper.styles.arrow as any,
        }
      : {},
  };

  useClickOutside(menuElement, handleClose, {
    clickTrigger: rootCloseEvent,
    disabled: !show,
  });

  return { menuProps, menuMetadata } as const;
};