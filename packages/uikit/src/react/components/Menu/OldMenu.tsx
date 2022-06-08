import React from 'react'
import { NS } from '../../common/cssClasses'

export interface MenuProps {
    tagName?: keyof JSX.IntrinsicElements
    large?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Menu: React.FC<MenuProps> = ({tagName = 'ul', large, children, ...htmlProps}) => {
    return React.createElement(
        tagName,
        {
            ...htmlProps,
            className: `${NS} menu`,
        },
        children,
    )
}