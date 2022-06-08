import React from 'react'
import { NS } from '../../common/cssClasses'

export const DropdownDivider: React.FC = () => {
    return <li className={`${NS} divider`} />
}
DropdownDivider.displayName = 'DropdownDivider'