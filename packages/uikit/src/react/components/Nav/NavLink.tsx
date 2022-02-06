import React from 'react'
import clsx from 'clsx'
import { Props } from '../../common/Props'
import { ACTIVE, DISABLED, NAVLINK } from '../../common/cssClasses'

export interface NavLinkProps extends Props, React.HTMLAttributes<HTMLAnchorElement> {
    active?: boolean
    disabled?: boolean
}

export const NavLink: React.VFC<NavLinkProps> = ({ className, active, disabled, ...htmlProps }) => {
    const navlinkClasses = clsx(
        NAVLINK,
        active && ACTIVE,
        disabled && DISABLED,
        className
    )

    return <a {...htmlProps} className={navlinkClasses} />
}
NavLink.displayName = 'NavLink'