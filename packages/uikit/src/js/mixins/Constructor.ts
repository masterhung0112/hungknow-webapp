// eslint-disable-next-line @typescript-eslint/ban-types
export type Constructor = new (...args: any[]) => {}

// eslint-disable-next-line @typescript-eslint/ban-types
export type GConstructor<T = {}> = new (...args: any[]) => T
