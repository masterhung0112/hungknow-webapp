import React from 'react'
import type { Placement } from '../Popper/usePopper'

export type DropdownContextValue = {
    toggle: (nextShow: boolean, event?: React.SyntheticEvent | MouseEvent | KeyboardEvent | Event) => void
    menuElement: HTMLElement | null
    toggleElement: HTMLElement | null
    setMenu: (ref: HTMLElement | null) => void
    setToggle: (ref: HTMLElement | null) => void
    show: boolean
    placement: Placement
}

export const DropdownContext = React.createContext<DropdownContextValue | null>(null)