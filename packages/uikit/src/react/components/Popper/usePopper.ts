import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Popper, { createPopper } from "@popperjs/core";
import { useSafeState } from "../../hooks/useSafeState";
import { dequal } from "dequal";
import { config } from "process";
//import { createPopper } from "./popper";

export type Modifier<Name, Options> = Popper.Modifier<Name, Options>;
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

const ariaDescribedByModifier: Modifier<"ariaDescribedBy", undefined> = {
  name: "ariaDescribedBy",
  enabled: true,
  phase: "afterWrite",
  effect:
    ({ state }) =>
    () => {
      const { reference, popper } = state.elements;
      
      if ("removeAttribute" in reference) {
        const ids = (reference.getAttribute("aria-describedby") || "")
          .split(",")
          .filter((id) => id.trim() !== popper.id);

        if (!ids.length) reference.removeAttribute("aria-describedby");
        else reference.setAttribute("aria-describedby", ids.join(","));
      }
    },
  fn: ({ state }) => {
    const { popper, reference } = state.elements;

    const role = popper.getAttribute("role")?.toLowerCase();

    if (popper.id && role === "tooltip" && "setAttribute" in reference) {
      const ids = reference.getAttribute("aria-describedby");
      if (ids && ids.split(",").indexOf(popper.id) !== -1) {
        return;
      }

      reference.setAttribute(
        "aria-describedby",
        ids ? `${ids},${popper.id}` : popper.id
      );
    }
  },
};

const disabledApplyStylesModifier = {
  name: 'applyStyles',
  enabled: false,
  phase: 'afterWrite',
  fn: () => undefined,
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
    strategy = "absolute",
    modifiers = [],
  }: UsePopperOptions = {}
): UsePopperState => {
  const prevModifiers = useRef<UsePopperOptions["modifiers"]>(modifiers);
  const popperInstanceRef = useRef<Instance>();

  const update = useCallback(() => {
    popperInstanceRef.current?.update();
  }, []);

  const forceUpdate = useCallback(() => {
    popperInstanceRef.current?.forceUpdate();
  }, []);

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

  const updateModifier = useMemo<Modifier<"updateStateModifier", any>>(
    () => ({
      name: "updateStateModifier",
      enabled: true,
      phase: "write",
      requires: ["computeStyles"],
      fn: ({ state }) => {
        const styles: UsePopperState["styles"] = {};
        const attributes: UsePopperState["attributes"] = {};

        Object.keys(state.elements).forEach((element) => {
          styles[element] = state.styles[element];
          attributes[element] = state.attributes[element];
        });

        setState({
          state,
          styles,
          attributes,
          update,
          forceUpdate,
          placement: state.placement,
        });
      },
    }),
    [update, forceUpdate, setState]
  );

  const nextModifiers = useMemo(() => {
    if (!dequal(prevModifiers.current, modifiers)) {
      prevModifiers.current = modifiers;
    }
    return prevModifiers.current!;
  }, [modifiers]);

  useEffect(() => {
    if (!popperInstanceRef.current || !enabled) return;

    popperInstanceRef.current.setOptions({
      placement,
      strategy,
      modifiers: [
        ...nextModifiers,
        updateModifier,
        disabledApplyStylesModifier,
      ],
    });
  }, [strategy, placement, updateModifier, enabled, nextModifiers]);
 
  useEffect(() => {
    if (!enabled || referenceElement == null || popperElement == null) {
      return undefined;
    }
    
    popperInstanceRef.current = createPopper(referenceElement, popperElement, {
      ...config,
      placement,
      strategy,
      modifiers: [...nextModifiers, ariaDescribedByModifier, updateModifier],
    });

    return () => {
      if (popperInstanceRef.current != null) {
        popperInstanceRef.current.destroy();
        popperInstanceRef.current = undefined;

        setState((s) => ({
          ...s,
          attributes: {},
          styles: { popper: {} },
        }));
      }
    };
  }, [enabled, referenceElement, popperElement]);

  return popperState;
};
