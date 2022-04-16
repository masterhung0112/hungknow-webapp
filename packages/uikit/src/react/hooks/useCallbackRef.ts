import { useState } from "react";

export function useCallbackRef<TValue = unknown>(): [
    TValue | null,
    (ref: TValue | null) => void,
]{
    return useState<TValue | null>(null)
}