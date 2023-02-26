import React, { useCallback, useEffect, useLayoutEffect, useReducer, useRef } from 'react'
import clsx from 'clsx'
import { Props } from '../../common/Props'
import { COLLAPSE, COLLAPSING } from '../../common/cssClasses'

export interface CollapseProps extends Props {
    // Component to render as the root element
    component?: React.ElementType
    isOpen?: boolean
    keepChildrenMounted?: boolean

    // The length of time the transition takes, in milliseconds.
    transitionDuration?: number
}

/**
 * `Collapse` can be in one of six states, enumerated here.
 * When changing the `isOpen` prop, the following happens to the states:
 * isOpen={true}  : CLOSED -> OPEN_START -> OPENING -> OPEN
 * isOpen={false} : OPEN -> CLOSING_START -> CLOSING -> CLOSED
 */
export enum AnimationStates {
    OPEN_START,
    OPENING,
    OPEN,
    CLOSING_START,
    CLOSING,
    CLOSED
}

export interface CollapseState {
    animationState: AnimationStates

    // The height that should be used for the content animations. This is a CSS value, not just a number.
    height?: string

    // The most recent non-zero height (once a height has been measured upon first open; it is undefined until then)
    heightWhenOpen?: number
}

type CollapseOpenState = {
    animationState: AnimationStates
    contentHeight: string | undefined
    contentHeightWhenOpen: number
}

const initAnimationState = (): CollapseOpenState => ({
    animationState: AnimationStates.CLOSED,
    contentHeight: undefined,
    contentHeightWhenOpen: 0
})

type CollapseOpenAction =
    | { type: 'open', contentHeight?: string, contentHeightWhenOpen?: number }
    | { type: 'closed', contentHeight?: string, contentHeightWhenOpen?: number }
    | { type: 'open-start' }
    | { type: 'closing-start', contentHeight: string }
    | { type: 'opening', contentHeight: string, contentHeightWhenOpen: number }
    | { type: 'closing', contentHeight: string, contentHeightWhenOpen: number }

const collapseOpenReducer = (state: CollapseOpenState, action: CollapseOpenAction): CollapseOpenState => {
    switch (action.type) {
        case 'open':
            return {
                ...state,
                animationState: AnimationStates.OPEN,
                contentHeight: action.contentHeight ? action.contentHeight : 'auto',
                contentHeightWhenOpen: action.contentHeightWhenOpen ? action.contentHeightWhenOpen : state.contentHeightWhenOpen
            }
        case 'closed':
            return {
                ...state,
                animationState: AnimationStates.CLOSED,
                contentHeight: action.contentHeight ? action.contentHeight : '0px',
                contentHeightWhenOpen: action.contentHeightWhenOpen ? action.contentHeightWhenOpen : state.contentHeightWhenOpen
            }
        case 'open-start':
            return { ...state, animationState: AnimationStates.OPEN_START }
        case 'closing-start':
            return {
                ...state,
                animationState: AnimationStates.CLOSING_START,
                contentHeight: action.contentHeight
            }
        case 'opening':
            return { animationState: AnimationStates.OPENING, contentHeight: action.contentHeight, contentHeightWhenOpen: action.contentHeightWhenOpen }
        case 'closing':
            return { animationState: AnimationStates.CLOSING, contentHeight: action.contentHeight, contentHeightWhenOpen: action.contentHeightWhenOpen }
        default:
            return state
    }
}

export const Collapse: React.FC<CollapseProps> = ({ component = 'div', isOpen = false, keepChildrenMounted = false, transitionDuration = 300, className, children }) => {
    const [{ animationState, contentHeight, contentHeightWhenOpen }, dispatchCollapseAnimation] = useReducer(collapseOpenReducer, {}, initAnimationState)
    const contentsRef = useRef<HTMLElement>()
    const isContentVisible = animationState !== AnimationStates.CLOSED
    const shouldRenderChildren = isContentVisible || keepChildrenMounted
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const timeoutCallback = useRef<() => void>(() => {})

    // create the new timeout callback according to the animation state
    // setTimeout cannot access the new value of animationState,
    // it refer to the animationState at the creation time.
    useEffect(() => {
        timeoutCallback.current = () => {
            switch (animationState) {
                case AnimationStates.OPENING:
                    dispatchCollapseAnimation({ type: 'open', contentHeight: 'auto' })
                    break
                case AnimationStates.CLOSING:
                    dispatchCollapseAnimation({ type: 'closed' })
                    break
                default:
                    break
            }
        }
    }, [animationState])

    // Start the animation if the `isOpen` prop update and the component is in the valid state
    useEffect(() => {
        if (isOpen) {
            switch (animationState) {
                case AnimationStates.OPEN:
                case AnimationStates.OPENING:
                    break
                default:
                    dispatchCollapseAnimation({ type: 'open-start' })
                    break
            }
        } else {
            switch (animationState) {
                case AnimationStates.CLOSED:
                case AnimationStates.CLOSING:
                default:
                    dispatchCollapseAnimation({ type: 'closing-start', contentHeight: `${contentHeightWhenOpen}px` })
                    break
            }
        }
    }, [isOpen])

    // After rendering, we can get the valid clientHeight value now. So we update the style to trigger the animation
    useLayoutEffect(() => {
        const clientHeight = contentsRef.current?.scrollHeight
        let animationTimer: ReturnType<typeof setTimeout> | null = null
        if (animationState == AnimationStates.OPEN_START) {
            if (clientHeight) {
                dispatchCollapseAnimation({
                    type: 'opening',
                    contentHeight: `${clientHeight}px`,
                    contentHeightWhenOpen: clientHeight
                })
                animationTimer = setTimeout(() => timeoutCallback.current(), transitionDuration)
            } else {
                console.error('unknown clientHeight for ', contentsRef.current?.outerHTML)
            }
        } else if (animationState == AnimationStates.CLOSING_START) {
            if (clientHeight) {
                dispatchCollapseAnimation({
                    type: 'closing',
                    contentHeight: '0px',
                    contentHeightWhenOpen: clientHeight
                })
                animationTimer = setTimeout(() => timeoutCallback.current(), transitionDuration)
            } else {
                console.error('unknown clientHeight for ', contentsRef.current?.outerHTML)
            }
        }

        return () => {
            if (animationTimer) {
                // clearTimeout(animationTimer)
            }
        }
    })

    // Set the initial animation state according to the value of `isOpen` prop
    useEffect(() => {
        if (isOpen) {
            dispatchCollapseAnimation({ type: 'open' })
        } else {
            dispatchCollapseAnimation({ type: 'closed' })
        }
    }, [])

    const collapseClasses = clsx(
        (animationState === AnimationStates.OPEN_START || animationState === AnimationStates.CLOSING_START || animationState === AnimationStates.CLOSING || animationState === AnimationStates.OPENING) ? COLLAPSING : COLLAPSE,
        animationState === AnimationStates.OPEN && isContentVisible && 'show',
        className
    )

    const contentsStyle = {
        height: isContentVisible ? contentHeight : undefined,
    }

    const contentsRefHandler = useCallback((el: HTMLElement | null) => {
        if (el) {
            const height = el.clientHeight

            if (isOpen) {
                dispatchCollapseAnimation({
                    type: isOpen ? 'open' : 'closed',
                    contentHeight: height === 0 ? undefined : `${height}px`,
                    contentHeightWhenOpen: height === 0 ? undefined : height,
                })

            }
            contentsRef.current = el
        }
    }, [])

    return React.createElement(
        component!,
        {
            ref: contentsRefHandler,
            className: collapseClasses,
            style: contentsStyle
        },
        shouldRenderChildren ? children : null
    )
}
Collapse.displayName = 'Collapse'
