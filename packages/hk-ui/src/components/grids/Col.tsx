import React from 'react';
import cls from 'classnames';

export type ColProps = {
    as: 'div' | 'span' | undefined;
} & JSX.IntrinsicElements['div']

export const Col = React.forwardRef<HTMLDivElement, ColProps>(({
    as: Component = 'div',
    className,
    ...props
}, ref) => {
    const spans: string[] = [];
    
    return <Component ref={ref} {...props} className={cls(className)} />;
});