import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useCallbackRef } from "../../hooks";
import { useMergedRefs } from "../../hooks/useMergedRefs";
import { RootCloseOptions } from "../../hooks/useRootClose";
import { DOMContainer, useWaitForDOMRef } from "../../hooks/useWaitForDOMRef";
import { TransitionCallbacks } from "../../types";
import { ChildrenFn } from "../../utils/isChildrenFn";
import { mergeOptionsWithPopperConfig } from "./mergeOptionsWithPopperConfig";
import {
  Offset,
  Placement,
  usePopper,
  UsePopperOptions,
  UsePopperState,
} from "./usePopper";

export interface PopperArrowProps {
  ref: React.RefCallback<HTMLElement>;
  style: React.CSSProperties;
}

export interface PopperMetadata {
  show: boolean;
  placement: Placement | undefined;
  popper: UsePopperState | null;
  arrowProps: Partial<PopperArrowProps>;
}

export interface PopperInjectedProps {
  ref: React.RefCallback<HTMLElement>;
  style: React.CSSProperties;
  "aria-labelledby"?: string;
}

export interface PopperProps {
  flip?: boolean;
  placement?: Placement;
  offset?: Offset;
  containerPadding?: number;
  popperConfig?: Omit<UsePopperOptions, "placement">;
  target: DOMContainer;
  container?: DOMContainer;
  show?: boolean;
  onHide?: (e: Event) => void;
  rootClose?: boolean;
  rootCloseDisabled?: boolean;
  rootCloseEvent?: RootCloseOptions["clickTrigger"];
  children: ChildrenFn<PopperInjectedProps, PopperMetadata>;
  transition?: React.ComponentType<
    { in?: boolean; appear?: boolean } & TransitionCallbacks
  >
}

export const Popper = React.forwardRef<HTMLElement, PopperProps>(
  (props, outerRef) => {
    const {
      flip,
      placement,
      offset,
      containerPadding,
      popperConfig,
      show,
      onHide,
      rootClose,
      rootCloseDisabled,
      rootCloseEvent,
    } = props;

    const [rootElement, attachRef] = useCallbackRef<HTMLElement>();
    const [arrowElement, attachArrowRef] = useCallbackRef<Element>();
    const mergedRef = useMergedRefs<HTMLElement | null>(attachRef, outerRef)

    const target = useWaitForDOMRef(props.target);
    const container = useWaitForDOMRef(props.container);

    const [exited, setExited] = useState(!props.show)

    const popper = usePopper(
      target,
      rootElement,
      mergeOptionsWithPopperConfig({
        placement,
        enableEvents: !!props.show,
        containerPadding: containerPadding || 5,
        flip,
        offset,
        arrowElement,
        popperConfig,
      })
    );

    if (props.show) {
        if (exited) setExited(false)
    } else if (!props.transition && !exited) {
        setExited(true)
    }

    let child = props.children(
      {
        ...popper.attributes.popper,
        style: popper.styles.popper as any,
        ref: mergedRef,
      },
      {
        popper,
        placement,
        show: !!props.show,
        arrowProps: {
          ...popper.attributes.arrow,
          style: popper.styles.arrow as any,
          ref: attachArrowRef,
        },
      }
    );
    return container ? ReactDOM.createPortal(child, container) : null;
  }
);
Popper.displayName = "Popper";
