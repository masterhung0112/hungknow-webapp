import { createContext, useContext } from "react";

const Context = createContext(window != null ? window : undefined)

export const WIndowProvider = Context.Provider
export function useWindow() {
    return useContext(Context)
}