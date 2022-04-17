import { createContext } from "react"
import { EventKey } from "../../types"

export interface NavContextValue {
    role?: string // Used by NavItem to determine its role
    activeKey: EventKey | null
    getControlledId: (key: EventKey | null) => string
    getControllerId: (key: EventKey | null) => string
}

export const NavContext = createContext<NavContextValue | null>(null)
NavContext.displayName = 'NavContext'