import { noop } from "@babel/types";
import React, { useContext, useRef } from "react";
import { isContext } from "vm";
import { usePopper } from "../Popper/usePopper";
import { DropdownContext } from "./DropdownContext";

export interface UseDropdownMenuOptions {
  show?: boolean
  
  // Whether or not to use Popper for positioning the menu
  usePopper?: boolean

}

export type UserDropdownMenuProps = Record<string, any> & {
  ref: React.RefCallback<HTMLElement>
  style?: React.CSSProperties
  'aria-labelledby'?: string
}

export interface UseDropdownMenuMetadata {
  show: boolean
  hasShown: boolean
}

export interface DropdownMenuProps extends UseDropdownMenuOptions {
  children: (props: UserDropdownMenuProps, meta: UseDropdownMenuMetadata) => React.ReactNode
}

const useDropdownMenu = (options: UseDropdownMenuOptions = {}) => {
  const context = useContext(DropdownContext)
  const hasShownRef = useRef(false)
  const show = context && context.show !== null ? context.show : !!options.show 

  if (show && !hasShownRef.current) {
    hasShownRef.current = true
  }

  const { setMenu, menuElement, toggleElement } = context || {}

  const popper = usePopper(
    toggleElement,
    menuElement
  )

  const menuProps: UserDropdownMenuProps = {
    ref: setMenu || noop,
  }
  const menuMetadata: UseDropdownMenuMetadata = {
    show,
    hasShown: hasShownRef.current,
  }
  return {menuProps, menuMetadata} as const
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children, ...options }) => {
  const {menuProps, menuMetadata} = useDropdownMenu(options)

  return (
    <>
      {children(menuProps, menuMetadata)}
    </>
  );
};
