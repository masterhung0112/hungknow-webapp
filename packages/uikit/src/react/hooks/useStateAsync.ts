import React, { useCallback, useEffect, useRef, useState } from "react";

type Updater<TState> = (state: TState) => TState;

export type AsyncSetState<TState> = (stateUpdate: React.SetStateAction<TState>) => Promise<TState>

/**
 * const [counter, setState] = useStateAsync(1)
 * const handleIncrease = async () => {
 *      await setState(2)
 *      doworkRequiringCurrenState() 
 * } 
 * @param initialState 
 * @returns 
 */
export const useStateAsync = <TState>(
  initialState: TState | (() => TState)
) => {
  const [state, setState] = useState(initialState);
  const resolvers = useRef<((state: TState) => void)[]>([]);

  useEffect(() => {
    resolvers.current.forEach((resolve) => resolve(state));
    resolvers.current.length = 0;
  }, [state]);

  const setStateAsync = useCallback(
    (update: Updater<TState> | TState) => {
      return new Promise<TState>((resolve, reject) => {
        setState((prevState) => {
          try {
            let nextState: TState;

            if (update instanceof Function) {
              nextState = update(prevState);
            } else {
              nextState = update;
            }

            // If state doesn't change, we must resolve the promise because
            // react won't re-render and effect will not resolve. If there are already
            // resovlers queued, then it should be safe to assume an update will happen
            if (!resolvers.current.length && Object.is(nextState, prevState)) {
              resolve(nextState);
            } else {
              resolvers.current.push(resolve);
            }
            return nextState;
          } catch (e) {
            reject(e);
            throw e;
          }
        });
      });
    },
    [setState]
  );

  return [state, setStateAsync];
};
