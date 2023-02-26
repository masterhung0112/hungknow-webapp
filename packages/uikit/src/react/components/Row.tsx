import React, {HTMLAttributes} from 'react'
import {getElementType} from '../utils/getElementType'
import cx from 'clsx'
import {column} from '../constants/grid'
import {isGridColSpecificSize} from '../utils/grid_utils'

export type RowProps = {
    as?: React.ComponentType | keyof React.ReactHTML;
    sm?: column;
    md?: column;
    lg?: column;
    className?: string;
} & HTMLAttributes<HTMLElement>

//React.forwardRef<HTMLDivElement, RowProps>(
export const Row: React.FC<RowProps> = (props) => {
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

    const classes = cx(
        sm === 'auto' && 'cols-sm',
        md === 'auto' && 'cols-md',
        lg === 'auto' && 'cols-lg',
        (isGridColSpecificSize(sm)) && `cols-sm-${String(sm)}`,
        (isGridColSpecificSize(md)) && `cols-md-${String(md)}`,
        (isGridColSpecificSize(lg)) && `cols-lg-${String(lg)}`,
        'row',
        'hk',
        className,
    )

    // const rest = removeNonHTMLProps(props)
    const ElementType = getElementType(Row, props)

    return (
        <ElementType {...rest} className={classes}>
            {children}
        </ElementType>
    )
}