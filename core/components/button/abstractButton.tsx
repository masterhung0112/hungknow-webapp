import React from 'react'
import { AbstractPureComponent } from 'common';

export interface IButtonProps {

}

export interface IButtonState {
    isActive: boolean;
}

export abstract class AbstractButton<H extends React.HTMLAttributes<HTMLElement>> extends AbstractPureComponent<
    IButtonProps & H,
    IButtonState
> {
    public state = {
        isActive: false,
    }

    public abstract render(): JSX.Element;

}