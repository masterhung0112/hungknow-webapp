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
        sm === 'auto' && 'hk-col-sm',
        md === 'auto' && 'hk-col-md',
        lg === 'auto' && 'hk-col-lg',
        (isGridColSpecificSize(sm)) && `hk-col-sm-${String(sm)}`,
        (isGridColSpecificSize(md)) && `hk-col-md-${String(md)}`,
        (isGridColSpecificSize(lg)) && `hk-col-lg-${String(lg)}`,
        (isGridColSpecificSize(smOffset)) && `hk-col-sm-offset-${String(smOffset)}`,
        (isGridColSpecificSize(mdOffset)) && `hk-col-md-offset-${String(mdOffset)}`,
        (isGridColSpecificSize(lgOffset)) && `hk-col-lg-offset-${String(lgOffset)}`,
        className,
    )

    const ElementType = getElementType(Col, props)

    return (
        <ElementType {...rest} className={classes}>
            {children}
        </ElementType>
    )
}