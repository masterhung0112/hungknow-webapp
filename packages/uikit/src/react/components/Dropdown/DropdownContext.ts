import React from 'react'

export type DropdownContextValue = {
    toggle: (nextShow: boolean, event?: React.SyntheticEvent | Event) => void
    menuElement: HTMLElement | null
    toggleElement: HTMLElement | null
    setMenu: (ref: HTMLElement | null) => void
    setToggle: (ref: HTMLElement | null) => void
    show: boolean
}

export const DropdownContext = React.createContext<DropdownContextValue | null>(null)