import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useCallbackRef } from "../../hooks";
import { useMergedRefs } from "../../hooks/useMergedRefs";
import { RootCloseOptions, useRootClose } from "../../hooks/useRootClose";
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

export interface PopperProps extends TransitionCallbacks {
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
  >;
}

export const Popper = React.forwardRef<HTMLElement, PopperProps>(
  (props, outerRef) => {
    const {
      flip,
      placement,
      offset,
      containerPadding,
      popperConfig = {},
      onHide,
      transition: Transition,
    } = props;

    const [rootElement, attachRef] = useCallbackRef<HTMLElement>();
    const [arrowElement, attachArrowRef] = useCallbackRef<Element>();
    const mergedRef = useMergedRefs<HTMLElement | null>(attachRef, outerRef);

    const target = useWaitForDOMRef(props.target);
    const container = useWaitForDOMRef(props.container);

    const [exited, setExited] = useState(!props.show);

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
      if (exited) setExited(false);
    } else if (!props.transition && !exited) {
      setExited(true);
    }

    const handleHidden: TransitionCallbacks["onExited"] = (...args) => {
      setExited(true);
      if (props.onExited) {
        props.onExited(...args);
      }
    };

    // Don't un-render the overlay while it's trnsitioning out
    const mountOverlay = props.show || (Transition && !exited);

    useRootClose(rootElement, props.onHide!, {
      disabled: !props.rootClose || props.rootCloseDisabled,
      clickTrigger: props.rootCloseEvent,
    });

    if (!mountOverlay) {
      // Don't borther showing anything if we don't have to
      return null;
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

    if (Transition) {
      const { onExit, onExiting, onEnter, onEntering, onEntered } = props;

      child = (
        <Transition
          in={props.show}
          appear
          onExit={onExit}
          onExiting={onExiting}
          onExited={handleHidden}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={onEntered}
        >
          {child}
        </Transition>
      );
    }

    return container ? ReactDOM.createPortal(child, container) : null;
  }
);
Popper.displayName = "Popper";
