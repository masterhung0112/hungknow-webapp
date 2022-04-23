import React from "react";

export type EventKey = string | number;

export type SelectCallback = (
    eventKey: string | null,
    e: React.SyntheticEvent<unknown>
) => void