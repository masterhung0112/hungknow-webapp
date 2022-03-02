import React from 'react'

/**
 * Returns a createElement() type based on the props of the Component.
 * Useful for calculating what type a component should render as.
 *
 * @param {function} Component A function or ReactClass.
 * @param {object} props A ReactElement props object
 * @param {function} [getDefault] A function that returns a default element type.
 * @returns {string|function} A ReactElement type
 */
export function getElementType<P extends { as?: React.ComponentType | keyof React.ReactHTML }>(Component: React.ComponentType<P>, props: P, getDefault?: () => React.ComponentType | keyof React.ReactHTML): React.ComponentType | keyof React.ReactHTML {
    const {defaultProps} = Component

    // ----------------------------------------
    // user defined "as" element type
    if (props.as && props.as !== defaultProps?.as) {
        return props.as
    }

    // ----------------------------------------
    // computed default element type
    if (getDefault) {
        const computedDefault = getDefault()
        if (computedDefault) {
            return computedDefault
        }
    }

    // ----------------------------------------
    // infer anchor links

    if ('href' in props) {
        return 'a'
    }

    if (defaultProps && defaultProps.as) {
        return defaultProps.as!
    }

    // ----------------------------------------
    // use defaultProp or 'div'
    return 'div'
}