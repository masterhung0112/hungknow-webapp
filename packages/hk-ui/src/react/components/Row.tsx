import React, {HTMLAttributes} from 'react'
import GridStyles from '../../components/grid/styles/_grid.scss'
import {getElementType} from '../utils/getElementType'
import cx from 'clsx'
import {column} from '../constants/grid'

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
        (typeof sm == 'number' || typeof sm == 'string') && `hk-cols-sm-${String(sm)}`,
        (typeof md == 'number' || typeof md == 'string') && `hk-cols-md-${String(md)}`,
        (typeof lg == 'number' || typeof lg == 'string') && `hk-cols-lg-${String(lg)}`,
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