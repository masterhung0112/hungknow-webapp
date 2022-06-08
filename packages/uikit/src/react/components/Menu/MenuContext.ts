export type MenuContextValue = {
    menuElement: HTMLElement | null
    toggleElement: HTMLElement | null
    setMenu: (ref: HTMLElement | null) => void
    setToggle: (ref: HTMLElement | null) => void
}