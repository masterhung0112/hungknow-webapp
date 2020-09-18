import React from 'react';
import { AbstractPureComponent, HTMLInputProps } from 'common';
import { AsyncControllableInput } from './asyncControllableInput';

export interface IInputGroupProps {

}

export interface IInputGroupState {
}

export class InputGroup extends AbstractPureComponent<IInputGroupProps & HTMLInputProps, IInputGroupState> {
    public state: IInputGroupState = {};

    public render() {
        return (
            <div>
                <AsyncControllableInput
                />

            </div>
        )
    }
}