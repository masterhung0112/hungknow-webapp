export type IRef<T = HTMLElement> = IRefObject<T> | IRefCallback<T>;

// compatible with React.Ref type in @types/react@^16
export interface IRefObject<T = HTMLElement> {
  readonly current: T | null;
}

export function isRefObject<T extends HTMLElement>(
  value: IRef<T> | undefined | null
): value is IRefObject<T> {
  return (
    value != null && typeof (value as IRefObject<T>).current !== "undefined"
  );
}

export type IRefCallback<T = HTMLElement> = (ref: T | null) => any;

export function getRef<T = HTMLElement>(ref: T | IRefObject<T>) {
  if (ref && (ref as IRefObject<T>).current) {
    return (ref as IRefObject<T>).current;
  }

  return ref as T;
}
