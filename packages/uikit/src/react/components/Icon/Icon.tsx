import React from 'react'
import clsx from 'clsx'
import { Props } from '../../common/Props'
import { IntentProps } from '../../common/IntentProps'
import { IconName } from '../../common/IconName'
import { MaybeElement } from '../../common/MaybeElement'
import { intentClass } from '../../common/Intent'

export enum IconSize {
    STANDARD = 16,
    LARGE = 20,
}

export interface IconProps extends IntentProps, Props, Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
    icon: IconName | MaybeElement
    color?: string
    size?: number
    style?: React.CSSProperties
    tagName?: keyof JSX.IntrinsicElements
    title?: string | false | null // for accessibility
    htmlTitle?: string; // for tooltip
}

export const Icon: React.FC<IconProps> = ({ icon, color, size, tagName = 'span', title, htmlTitle, intent, className, ...htmlProps }) => {
    size = size ? size : IconSize.STANDARD
    const pixelGridSize = size >= IconSize.LARGE ? IconSize.LARGE : IconSize.STANDARD
    const viewBox = `0 0 ${pixelGridSize} ${pixelGridSize}`

    const classes = clsx(
        'hk1 icon',
        intent && intentClass(intent),
        className
    )

    // If icon isn't of string type, return itself
    if (icon == null || typeof icon === 'boolean') {
        return null
    } else if (typeof icon !== 'string') {
        return icon
    }

    return React.createElement(
        tagName,
        {
            ...htmlProps,
            'aria-hidden': title ? undefined : true,
            icon: icon,
            className: classes,
            title: htmlTitle,
        },
        <svg fill={color} data-icon={icon} width={size} height={size} viewBox={viewBox}>
            {title && <desc>{title}</desc>}
            <use xlinkHref={`public/bootstrap-icons.svg#${icon}`} />
        </svg>
    )
}
Icon.displayName = 'Icon'