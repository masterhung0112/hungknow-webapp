import { useCallback, useRef } from "react"
import { useForceUpdate } from "./useForceUpdate"

export function useRefWithUpdate<T>() {
    const forceUpdate = useForceUpdate()
    const ref = useRef<T | null>(null)

    const attachRef = useCallback(
        (element: T | null) => {
            ref.current = element
            // ensure that a menu set triggers an update for consumers
            forceUpdate()
        },
        [forceUpdate]
    )
    return [ref, attachRef] as const
}