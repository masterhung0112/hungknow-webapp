import React, {HTMLAttributes} from 'react'
import cx from 'clsx'
import {column, GridOffSetType} from '../constants/grid'
import {getElementType} from '../utils/getElementType'
import {isGridColSpecificSize} from '../utils/grid_utils'

export type ColProps = {
    as?: React.ComponentType | keyof React.ReactHTML;
    sm?: column;
    md?: column;
    lg?: column;

    smOffset?: GridOffSetType;
    mdOffset?: GridOffSetType;
    lgOffset?: GridOffSetType;
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
            smOffset,
            mdOffset,
            lgOffset,
            className,
            children,
            ...rest
        } = props

    const classes = cx(
        sm === 'auto' && 'col-sm',
        md === 'auto' && 'col-md',
        lg === 'auto' && 'col-lg',
        (isGridColSpecificSize(sm)) && `col-sm-${String(sm)}`,
        (isGridColSpecificSize(md)) && `col-md-${String(md)}`,
        (isGridColSpecificSize(lg)) && `col-lg-${String(lg)}`,
        (isGridColSpecificSize(smOffset)) && `col-sm-offset-${String(smOffset)}`,
        (isGridColSpecificSize(mdOffset)) && `col-md-offset-${String(mdOffset)}`,
        (isGridColSpecificSize(lgOffset)) && `col-lg-offset-${String(lgOffset)}`,
        className,
    )

    const ElementType = getElementType(Col, props)

    return (
        <ElementType {...rest} className={classes}>
            {children}
        </ElementType>
    )
}