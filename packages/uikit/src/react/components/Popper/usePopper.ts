import React, { useCallback, useMemo, useRef, useState } from "react";
import Popper from "@popperjs/core";
import { useSafeState } from "../../hooks/useSafeState";

export type Modifier<Name, Options> = Popper.Modifier<Name, Options>
export type Instance = Popper.Instance;
export type Options = Popper.Options;
export type Placement = Popper.Placement;
export type VirtualElement = Popper.VirtualElement;
export type State = Popper.State;

export interface UsePopperState {
  placement: Placement;
  update: () => void;
  forceUpdate: () => void;
  attributes: Record<string, Record<string, any>>;
  styles: Record<string, Partial<CSSStyleDeclaration>>;
  state?: State;
}

export type UsePopperOptions = Omit<
  Options,
  "modifiers" | "placement" | "strategy"
> & {
  enabled?: boolean;
  placement?: Options["placement"];
  strategy?: Options["strategy"];
  modifiers?: Options["modifiers"];
};

/**
 * Position an element relative some reference element using Popper.js
 * @param param0 
 * @returns 
 */
export const usePopper = (
    referenceElement: VirtualElement | null | undefined,
    popperElement: HTMLElement | null | undefined,
    { 
        enabled = true,
        placement = "bottom", 
        strategy = 'absolute',
        modifiers = []
    }: UsePopperOptions = {}
): UsePopperState => {
  const prevModifiers = useRef<UsePopperOptions['modifiers']>(modifiers)
  const popperInstanceRef = useRef<Instance>()

  const update = useCallback(() => {
      popperInstanceRef.current?.update()
  }, [])

  const forceUpdate = useCallback(() => {
      popperInstanceRef.current?.forceUpdate()
  }, [])

  const [popperState, setState] = useSafeState(
    useState<UsePopperState>({
      placement,
      update,
      forceUpdate,
      attributes: {},
      styles: {
        popper: {},
        arrow: {},
      },
    })
  );

  const updateModifier = useMemo<Modifier<'updateStateModifier', any>>(
      () => ({
          name: 'updateStateModifier',
          enabled: true,
          phase: 'write',
          requires: ['computeStyles'],
          fn: ({ state }) => {
              const styles: UsePopperState['styles'] = {}
              const attributes: UsePopperState['attributes'] = {}

              Object.keys(state.elements).forEach((element) => {
                  styles[element] = state.styles[element]
                    attributes[element] = state.attributes[element]
              })

              setState({
                  state,
                  styles,
                  attributes,
                  update,
                  forceUpdate,
                  placement: state.placement
              })
          }
      }),
      [update, forceUpdate, setState]
  )

  return popperState;
};
