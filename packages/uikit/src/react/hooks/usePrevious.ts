import { useEffect, useRef } from "react";

/**
 * Store the last of some value. Tracked via a `ref` only updating it after the component renders.
 * Helpful if you need to compare a prop value to it's previous value during render.
 */
export function usePrevious<T>(value: T): T | null {
    const ref = useRef<T | null>(null)

    useEffect(() => {
        ref.current = value
    })

    return ref.current
}