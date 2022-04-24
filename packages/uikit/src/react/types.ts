import React from "react";

export type EventKey = string | number;

export type SelectCallback = (
    eventKey: string | null,
    e: React.SyntheticEvent<unknown>
) => void

export interface TransitionCallbacks {
    setEnter?(node: HTMLElement, isAppearing: boolean): any
    onEntering?(node: HTMLElement, isAppearing: boolean): any;
    onEntered?(node: HTMLElement, isAppearing: boolean): any;
    onExit?(node: HTMLElement): any;
    onExiting?(node: HTMLElement): any;
    onExited?(node: HTMLElement): any;
}