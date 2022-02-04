import React from 'react'
import clsx from 'clsx'
import { Props } from '../../common/Props'
import { IntentProps } from '../../common/IntentProps'
import { IconName } from '../../common/IconName'
import { MaybeElement } from '../../common/MaybeElement'

export enum IconSize {
    STANDARD = 16,
    LARGE = 20,
}

export interface IconProps extends IntentProps, Props {
    icon: IconName | MaybeElement
    color?: string
    size?: number
    style?: React.CSSProperties
    tagName?: keyof JSX.IntrinsicElements
    title?: string | false | null
}

export const Icon: React.FC<IconProps> = ({ icon, color, size, tagName = 'span', title, ...htmlProps }) => {
    const pixelGridSize = size && size >= IconSize.LARGE ? IconSize.LARGE : IconSize.STANDARD
    const viewBox = `0 0 ${pixelGridSize} ${pixelGridSize}`

    const classes = clsx('hk1 icon')

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
            className: classes
        },
        <svg fill={color} data-icon={icon} width={size} height={size} viewBox={viewBox}>
            {title && <desc>{title}</desc>}
            <use xlinkHref={`bootstrap-icons.svg#${icon}`}/>
        </svg>
    )
}
Icon.displayName = 'Icon'