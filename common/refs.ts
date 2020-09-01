export type IRef<T = HTMLElement> = IRefObject<T> | IRefCallback<T>;

// compatible with React.Ref type in @types/react@^16
export interface IRefObject<T = HTMLElement> {
    readonly current: T | null;
}

export type IRefCallback<T = HTMLElement> = (ref: T | null) => any;

export function getRef<T = HTMLElement>(ref: T | IRefObject<T>) {
    if (ref && (ref as IRefObject<T>).current) {
        return (ref as IRefObject<T>).current;
    }

    return ref as T;
}
