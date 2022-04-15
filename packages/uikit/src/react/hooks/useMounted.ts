import { mount } from 'enzyme'
import { useRef, useEffect } from 'react'

export const useMounted = (): () => boolean => {
    const mounted = useRef(true)
    const isMounted = useRef(() => mounted.current)

    useEffect(() => {
        mounted.current = true
        return () => {
            mounted.current = false
        }
    }, [])

    return isMounted.current
}
