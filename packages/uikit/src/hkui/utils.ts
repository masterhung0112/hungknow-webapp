export const normalizeComponentName = (name: string): string | undefined => {
    return typeof name === 'string' ? name.replace(/-/g, '').toLowerCase() : undefined
}
