import React, {HTMLAttributes} from 'react'
import GridStyles from '../../components/grid/styles/_grid.scss'
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
        sm === 'auto' && 'hk-cols-sm',
        md === 'auto' && 'hk-cols-md',
        lg === 'auto' && 'hk-cols-lg',
        (isGridColSpecificSize(sm)) && `hk-cols-sm-${String(sm)}`,
        (isGridColSpecificSize(md)) && `hk-cols-md-${String(md)}`,
        (isGridColSpecificSize(lg)) && `hk-cols-lg-${String(lg)}`,
        GridStyles['hk-row'],
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