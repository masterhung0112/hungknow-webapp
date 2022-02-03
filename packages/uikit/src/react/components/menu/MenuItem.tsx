import React from 'react'
import cx from 'clsx'
import {ActionProps} from '../../common/ActionProps'
import {LinkProps} from '../../common/LinkProps'

// MenuItem accept Link Props and Clickable Props
export interface MenuItemProps extends ActionProps, LinkProps {
    text: React.ReactNode | string;
    label?: string;
    labelClassName?: string;
    labelElement?: React.ReactNode;
    tagName?: keyof JSX.IntrinsicElements;
    active?: boolean;
    expanded?: boolean;
    disabled?: boolean;
    isHeader?: boolean;
}

/**
 * If the parent menu is the <ul> tag, you better
 */
export const MenuItem: React.FC<MenuItemProps> = ({text = '', label, labelClassName, labelElement, tagName = 'a', active, expanded, disabled, isHeader, children, ...htmlProps}) => {
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
        if (tagName === 'a') {
            // eslint-disable-next-line no-param-reassign
            tagName = 'span'
        }
    }

    if (Array.isArray(children) && children.length > 0) {
        mainClassname = 'submenu'
        hasSubMenu = true
    }

    const anchorClasses = cx(
        mainClassname,
        active && 'active',
        disabled && 'disabled',
        expanded && 'expanded',
    )

    const target = React.createElement(
        tagName,
        {
            ...htmlProps,
            className: anchorClasses,
        },
        maybeRenderLabel,
        hasSubMenu ? <div className='menu-header'><h4 className='menu-heading'>{text}</h4></div> : text,
        hasSubMenu ? <ul>{children}</ul> : children,
    )
    return <li>{target}</li>
}