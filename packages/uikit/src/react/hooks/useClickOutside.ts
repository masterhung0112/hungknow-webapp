import { contains } from "dom-helpers";
import listen from "dom-helpers/esm/listen";
import ownerDocument from "dom-helpers/esm/ownerDocument";
import React, { useCallback, useEffect, useRef } from "react";
import { useEventCallback } from "./useEventCallback";

const noop = () => {}

export type MouseEvents = {
    [K in keyof GlobalEventHandlersEventMap]: GlobalEventHandlersEventMap[K] extends MouseEvent
        ? K
        : never
}[keyof GlobalEventHandlersEventMap]

export interface ClickOutsideOptions {
  disabled?: boolean;
  clickTrigger?: MouseEvents;
} 

function isLeftClickEvent(event: MouseEvent) {
  return event.button === 0;
}

function isModifiedEvent(event: MouseEvent) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

export const getRefTarget = (
  ref: React.RefObject<Element> | Element | null | undefined
) => ref && ('current' in ref ? ref.current : ref)

const InitialTriggerEvents: Partial<Record<MouseEvents, MouseEvents>> = {
  click: 'mousedown',
  mouseup: 'mousedown',
  pointerup: 'pointerdown',
};

/**
 The `useClickOuside` hook registers your callback on the document that fires
 when a pointer event is registered outside of the provided ref or element.
 */
export function useClickOutside(
    ref: React.RefObject<Element> | Element | null | undefined,
    onClickOutside: (e: Event) => void = noop,
    { disabled, clickTrigger = 'click' } : ClickOutsideOptions = {},
) {
  const preventMouseClickOusideRef = useRef(false)
  const waitingForTrigger = useRef(false)

  const handleMouseCapture = useCallback(
    (e) => {
      const currentTarget = getRefTarget(ref)

      preventMouseClickOusideRef.current = 
      !currentTarget ||
      isModifiedEvent(e) ||
      !isLeftClickEvent(e) ||
      !!contains(currentTarget, e.target) ||
      waitingForTrigger.current
    },
    [ref]
  )

  const handleInitialMouse = useEventCallback((e: MouseEvent) => {
    const currentTarget = getRefTarget(ref)
    if (currentTarget && contains(currentTarget, e.target as any)) {
      waitingForTrigger.current = true
    }
  })

  const handleMouse = useEventCallback((e: MouseEvent) => {
    if (!preventMouseClickOusideRef.current) {
      onClickOutside(e)
    }
  })

  useEffect(() => {
    if (disabled || ref == null) return undefined

    const doc = ownerDocument(getRefTarget(ref)!)

    let currentEvent = (doc.defaultView || window).event

    let removeInitialTriggerListener: (() => void) | null = null
    if (InitialTriggerEvents[clickTrigger]) {
      removeInitialTriggerListener = listen(
        doc as any,
        InitialTriggerEvents[clickTrigger]!,
        handleInitialMouse,
        true,
      )
    }

    // Use capture for this listener so it fires before React's listener, to
    // avoid false positives in the contains() check below if the target DOM
    // element is removed in the React mouse callback.
    const removeMouseCaptureListener = listen(
      doc as any,
      clickTrigger,
      handleMouseCapture,
      true
    )

    const removeMouseListener = listen(
      doc as any,
      clickTrigger,
      (e) => {
        // skip if this event is the same as the one running when we added the handlers
        if (e === currentEvent) {
          currentEvent = undefined
          return
        }

        handleMouse(e)
      }
    )

    let mobileSafarihackListeners = [] as Array<() => void>
    if ('ontouchstart' in doc.documentElement) {
      mobileSafarihackListeners = [].slice
        .call(doc.body.children)
        .map((el) => listen(el, 'mousemove', noop))
    }


    return () => {
      removeInitialTriggerListener?.()
      removeMouseCaptureListener()
      removeMouseListener()
      mobileSafarihackListeners.forEach((remove) => remove())
    }
  }, [ref, disabled, clickTrigger, handleMouseCapture, handleInitialMouse, handleMouse])
}