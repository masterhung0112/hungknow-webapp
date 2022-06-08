import ownerDocument from "dom-helpers/esm/ownerDocument";
import listen from 'dom-helpers/listen';
import React, { useEffect } from "react";
import { noop } from "../utils/noop";
import { ClickOutsideOptions, getRefTarget, useClickOutside } from "./useClickOutside";
import { useEventCallback } from "./useEventCallback";

export interface RootCloseOptions extends ClickOutsideOptions {
  disabled?: boolean;
}

const escapeKeyCode = 27;

/*
 The `useRootClose` hook registers your callback on the document when rendered.
 Powers the `<Popper />` component. This is used achieve modal
 style beavhiour where your callback is triggered when the user tried to interact 
 with the rest of the document or hits the `esc` key
*/
export function useRootClose(
  ref: React.RefObject<Element> | Element | null | undefined,
  onRootClose: (e: Event) => void,
  { disabled, clickTrigger }: RootCloseOptions
) {
  const onClose = onRootClose || noop;
  useClickOutside(ref, onClose, { disabled, clickTrigger });

  const handleKeyUp = useEventCallback((e: KeyboardEvent) => {
    if (e.keyCode === escapeKeyCode) {
      onClose(e);
    }
  });

  useEffect(() => {
    if (disabled || ref === null) return undefined;
    const doc = ownerDocument(getRefTarget(ref)!);

    // Store the current event to avoid triggering handlers immediately
    // https://github.com/facebook/react/issues/20074

    let currentEvent = (doc.defaultView || window).event
    const removeKeyupListener = listen(doc as any, "keyup", (e) => {
      if (e === currentEvent) {
        currentEvent = undefined;
        return;
      }
      handleKeyUp(e);
    });
    
    return () => {
      removeKeyupListener();
    };
  }, [ref, disabled, handleKeyUp]);
}
