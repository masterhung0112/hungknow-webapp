import React, { useEffect, useRef } from "react";

/**
 * Create a `Ref` whose value is updated in an effect, ensuring the most recent value
 * is the one rendered with. Generally only required for Concurrent mode usage
 * where previous work in `render() may be discarded before being used.
 */
export function useCommittedRef<TValue>(
    value: TValue
): React.MutableRefObject<TValue> {
    const ref = useRef(value)

    useEffect(() => {
        ref.current = value
    }, [value])

    return ref
}