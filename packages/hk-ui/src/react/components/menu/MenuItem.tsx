import React from 'react'
import cx from 'clsx'

export interface MenuItemProps {
    text: React.ReactNode | string;
    label?: string;
    labelClassName?: string;
    labelElement?: React.ReactNode;
    tagName?: keyof JSX.IntrinsicElements;
    active?: boolean;
    disabled?: boolean;
}

export const MenuItem: React.VFC<MenuItemProps> = ({text = '', label, labelClassName, labelElement, tagName = 'a', active, disabled, ...htmlProps}) => {
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

    const anchorClasses = cx(
        'menu-item',
        active && 'active',
        disabled && 'disabled',
    )

    const target = React.createElement(
        tagName,
        {
            ...htmlProps,
            className: anchorClasses,
        },
        <span>{text}</span>,
        maybeRenderLabel,
    )
    return <li>{target}</li>
}