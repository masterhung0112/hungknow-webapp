import React from 'react';
import cls from 'classnames';

export type ColProps = {
    as: 'div' | 'span' | undefined;
    xs: null;
    sm: null;
    md: null;
    lg: null;
    xl: null;
    'xs-offset': null;
    'sm-offset': null;
    'md-offset': null;
    'lg-offset': null;
    'xl-offset': null;
} & JSX.IntrinsicElements['div']

export const Col = React.forwardRef<HTMLDivElement, ColProps>(({
    as: Component = 'div',
    className,
    ...props
}, ref) => {
    // const spans: string[] = [];

    return <Component ref={ref} {...props} className={cls(className)} />;
});