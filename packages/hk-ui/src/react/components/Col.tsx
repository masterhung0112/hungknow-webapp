import React, {HTMLAttributes} from 'react'
import cx from 'clsx'
import {column} from '../constants/grid'
import {getElementType} from '../utils/getElementType'

export type ColProps = {
    as?: React.ComponentType | keyof React.ReactHTML;
    sm?: column;
    md?: column;
    lg?: column;
    className?: string;
} & HTMLAttributes<HTMLElement>

export const Col: React.FC<ColProps> = (props) => {
    const
        {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
            as,
            sm,
            md,
            lg,
            className,
            children,
            ...rest
        } = props

    const classes = cx([
        sm === 'auto' && 'hk-col-sm',
        md === 'auto' && 'hk-col-md',
        lg === 'auto' && 'hk-col-lg',
        (typeof sm == 'number' || typeof sm == 'string') && `hk-col-sm-${String(sm)}`,
        (typeof md == 'number' || typeof md == 'string') && `hk-col-md-${String(md)}`,
        (typeof lg == 'number' || typeof lg == 'string') && `hk-col-lg-${String(lg)}`,
        className,
    ])

    const ElementType = getElementType(Col, props)

    return (
        <ElementType {...rest} className={classes}>
            {children}
        </ElementType>
    )
}