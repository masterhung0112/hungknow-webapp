// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isGridColSpecificSize = (value: any) => {
    return typeof value == 'number' || typeof value == 'string'
}