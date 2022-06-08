import React, { useMemo } from "react";

type CallbackRef<T> = (ref: T | null) => void
type Ref<T> = React.MutableRefObject<T> | CallbackRef<T>

function toFnRef<T>(ref?: Ref<T> | null) {
    return !ref || typeof ref === 'function'
    ? ref
    : (value: T) => {
        ref.current = value
    }
}

export function mergeRefs<T>(refA?: Ref<T> | null, refB?: Ref<T> | null) {
    const a = toFnRef(refA)
    const b = toFnRef(refB)

    return (value: T) => {
        if (a) a(value)
        if (b) b(value)
    }
}

export function useMergedRefs<T>(refA?: Ref<T> | null, refB?: Ref<T> | null) {
    return useMemo(() => mergeRefs(refA, refB), [refA, refB])
}