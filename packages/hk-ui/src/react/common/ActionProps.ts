import React from 'react'

export interface ActionProps {
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    text?: React.ReactNode;
}