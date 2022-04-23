import React, {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { createSecureContext } from "tls";

interface SSRContextValue {
  prefix: string;
  current: number;
}

const defaultContext: SSRContextValue = {
  prefix: String(Math.round(Math.random() * 1000000000)),
  current: 0,
};

const SSRContext = createContext<SSRContextValue>(defaultContext);

interface SSRProviderProps {
  children: ReactNode;
}

const SSRProvider: React.FC<SSRProviderProps> = (props) => {
  let cur = useContext(SSRContext);

  let value: SSRContextValue = useMemo(
    () => ({
      prefix: cur === defaultContext ? "" : `${cur.prefix}-${++cur.current}`,
      current: 0,
    }),
    [cur]
  );

  return (
    <SSRContext.Provider value={value}>{props.children}</SSRContext.Provider>
  );
};

const canUseDOM = Boolean(
  typeof window != "undefined" &&
    window.document &&
    window.document.createElement
);

export function useSSRSafeId(defaultId?: string): string {
  let ctx = useContext(SSRContext);

  if (ctx === defaultContext && !canUseDOM) {
    console.warn(
      "When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server."
    );
  }

  return useMemo(
    () => defaultId || `react-aria${ctx.prefix}-${++ctx.current}`,
    [defaultId]
  );
}

export function useIsSSR(): boolean {
  let cur = useContext(SSRContext);
  let isInSSRContext = cur !== defaultContext;
  let [isSSR, setIsSSR] = useState(isInSSRContext);

  // If on the client, and the component was initially server rendered,
  // then schedule a layout effect to update the component after hydration.
  if (typeof window !== "undefined" && isInSSRContext) {
    // This if statement technically breaks the rules of hooks, but is safe
    // because the condition never changes after mounting.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
      setIsSSR(false);
    }, []);
  }

  return isSSR;
}
