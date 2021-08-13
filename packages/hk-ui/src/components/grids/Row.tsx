import React from 'react';
import cls from 'classnames';

export type RowProps = {
    as: 'div' | 'span' | undefined;
} & JSX.IntrinsicElements['div']

export const Row = React.forwardRef<HTMLDivElement, RowProps>(({
    as: Component = 'div',
    className,
    ...props
}, ref) => {
    // const spans: string[] = [];

    return <Component ref={ref} {...props} className={cls(className)} />;
});