import React from 'react'
import clsx from 'clsx'
import { Alignment } from '../../common/Alignment'
import { Props } from '../../common/Props'
import { BUTTON_GROUP, FILL, LARGE, MINIMAL, VERTICAL } from '../../common/cssClasses'
import { alignmentClass } from '../../common/alignmentClass'

export interface ButtonGroupProps extends Props, React.HTMLAttributes<HTMLDivElement> {
    alignText?: Alignment
    fill?: boolean
    minimal?: boolean
    large?: boolean
    vertical?: boolean
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({alignText, fill, minimal, large, vertical, children, className, ...htmlProps}) => {
    const buttonGroupClasses = clsx(
        BUTTON_GROUP,
        fill && FILL,
        large && LARGE,
        minimal && MINIMAL,
        vertical && VERTICAL,
        alignText && alignmentClass(alignText),
        className
    )
    return (
        <div {...htmlProps} className={buttonGroupClasses}>
            {children}
        </div>
    )
}

ButtonGroup.displayName = 'ButtonGroup'