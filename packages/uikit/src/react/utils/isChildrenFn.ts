import React from "react"

export type ChildrenFn<P, M> = (
    props: P,
    meta: M
  ) => React.ReactNode

export function isChildrenFn<P = {}, M = {}>(children?: any): children is ChildrenFn<P, M> {
    return children instanceof Function 
}