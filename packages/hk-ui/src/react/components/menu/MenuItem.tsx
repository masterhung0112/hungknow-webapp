import React from 'react'
import cx from 'clsx'
import { ActionProps } from '../../common/ActionProps'

export interface MenuItemProps extends ActionProps {
    text: React.ReactNode | string;
    label?: string;
    labelClassName?: string;
    labelElement?: React.ReactNode;
    tagName?: keyof JSX.IntrinsicElements;
    active?: boolean;
    disabled?: boolean;
    isHeader?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({ text = '', label, labelClassName, labelElement, tagName = 'a', active, disabled, isHeader, children, ...htmlProps }) => {
    const maybeRenderLabel = React.useMemo(() => {
        if (label == null && labelElement == null) {
            return null
        }
        return (
            <span className={cx('menu-item-label', labelClassName)}>
                {label}
                {labelElement}
            </span>
        )
    }, [label, labelClassName, labelElement])

    let mainClassname = 'menu-item'
    let hasSubMenu = false

    if (isHeader) {
        mainClassname = 'menu-header'
    }

    if (Array.isArray(children) && children.length > 0) {
        mainClassname = 'submenu'
        hasSubMenu = true
    }

    const anchorClasses = cx(
        mainClassname,
        active && 'active',
        disabled && 'disabled',
    )

    const target = React.createElement(
        tagName,
        {
            ...htmlProps,
            className: anchorClasses,
        },
        maybeRenderLabel,
        hasSubMenu ? <div className='menu-header'><h4 className='menu-heading'>{text}</h4></div> : text,
        children,
    )
    return <li>{target}</li>
}