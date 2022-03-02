import React from 'react'
import { IconName } from './IconName';
import { MaybeElement } from './MaybeElement';

export interface ActionProps {
    disabled?: boolean;
    // Name of a Bootstrap icon or an icon element) to render before the text
    icon?: IconName | MaybeElement; 
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    text?: React.ReactNode;
}