import React, { Dispatch, SetStateAction, useCallback } from "react";
import { useMounted } from "./useMounted";
import { AsyncSetState } from "./useStateAsync";

type StateSetter<TState> = Dispatch<SetStateAction<TState>>;

/**
 * const [show, setShow] = useSafeState(useState(true))
 */
export function useSafeState<TState>(
  state: [TState, AsyncSetState<TState>]
): [TState, (stateUpdate: React.SetStateAction<TState>) => Promise<void>];
export function useSafeState<TState>(
  state: [TState, StateSetter<TState>]
): [TState, StateSetter<TState>];
export function useSafeState<TState>(
  state: [TState, StateSetter<TState> | AsyncSetState<TState>]
): [TState, StateSetter<TState> | AsyncSetState<TState>] {
  const isMounted = useMounted();

  return [
    state[0],
    useCallback(
      (nextState: SetStateAction<TState>) => {
        if (!isMounted()) return;
        return state[1](nextState);
      },
      [isMounted, state[1]]
    ),
  ];
}
