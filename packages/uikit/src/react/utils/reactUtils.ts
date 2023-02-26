export function isReactNodeEmpty(node?: React.ReactNode, skipArray = false): boolean {
    return (
        node == null ||
        node === '' ||
        node === false ||
        (!skipArray &&
            Array.isArray(node) &&
            // only recurse one level through arrays, for performance
            (node.length === 0 || node.every(n => isReactNodeEmpty(n, true))))
    )
}