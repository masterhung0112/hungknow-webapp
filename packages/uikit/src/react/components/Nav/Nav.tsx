import React from 'react'
import clsx from 'clsx'
import { Props } from '../../common/Props'
import { NAV, VERTICAL } from '../../common/cssClasses'

export interface NavProps extends Props {
    tagName?: string
    
    vertical?: boolean
}

export const Nav: React.FC<NavProps> = ({ tagName = 'nav', vertical, children, className, ...htmlProps }) => {
    const navClasses = clsx(
        NAV,
        vertical && VERTICAL,
        className
    )

    return React.createElement(
        tagName,
        {
            ...htmlProps,
            className: navClasses,
        },
        children
    )
}
Nav.displayName = 'Nav'