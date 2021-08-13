import React from 'react';
import GridStyles from '../components/grid/styles/_grid.scss';

export const breakpoints = ['xs', 'sm', 'md', 'lg'];

export type RowProps = {
    as: 'div' | 'span' | undefined;
} & JSX.IntrinsicElements['div']

export const Row = React.forwardRef<HTMLDivElement, RowProps>(({
    as: Component = 'div',
    className,
    ...props
}, ref) => {
    // const spans: string[] = [];

    return <Component ref={ref} {...props} className={`${className} ${GridStyles['hk-row']}`} />;
});