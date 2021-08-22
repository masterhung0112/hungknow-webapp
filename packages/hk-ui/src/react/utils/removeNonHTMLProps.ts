/* eslint-disable @typescript-eslint/no-explicit-any */
const INVALID_PROPS: string[] = []

/**
 * Returns an object consisting of props beyond the scope of the Component.
 * Useful for getting and spreading unknown props from the user.
 * @param {function} Component A function or ReactClass.
 * @param {object} props A ReactElement props object
 * @returns {{}} A shallow copy of the prop object
 */
export function removeNonHTMLProps(
    props: { [key: string]: any },
    invalidProps = INVALID_PROPS,
    shouldMerge = false,
): { [key: string]: any } {
    if (shouldMerge) {
        // eslint-disable-next-line no-param-reassign
        invalidProps = invalidProps.concat(INVALID_PROPS)
    }

    return invalidProps.reduce(
        (prev, curr) => {
            // Props with hyphens (e.g. data-*) are always considered html props
            if (curr.indexOf('-') !== -1) {
                return prev
            }

            if (Object.prototype.hasOwnProperty.call(prev, curr)) {
                delete (prev as any)[curr]
            }
            return prev
        },
        {...props},
    )
}
