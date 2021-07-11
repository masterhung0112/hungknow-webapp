import React from 'react';

export interface IAsyncControllableInputProps
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    inputRef?: React.LegacyRef<HTMLInputElement>;
}

export interface IAsyncControllableInputState {

    /**
   * Whether we are in the middle of a composition event.
   * @default false
   */
    isComposing: boolean;

    /**
   * The source of truth for the input value. This is not updated during IME composition.
   * It may be updated by a parent component.
   * @default ""
   */
    externalValue: IAsyncControllableInputProps['value'];

    /**
   * The latest input value, which updates during IME composition. If undefined, we use
   * externalValue instead.
   */
    localValue: IAsyncControllableInputProps['value'];
}

/**
 * A stateful wrapper around the low-level <input> component which works around a
 * [React bug](https://github.com/facebook/react/issues/3926). This bug is reproduced when an input
 * receives CompositionEvents (for example, through IME composition) and has its value prop updated
 * asychronously. This might happen if a component chooses to do async validation of a value
 * returned by the input's `onChange` callback.
 *
 * Implementation adapted from https://jsfiddle.net/m792qtys/ (linked in the above issue thread).
 */
export class AsyncControllableInput extends React.PureComponent<
IAsyncControllableInputProps,
IAsyncControllableInputState
> {
    public state: IAsyncControllableInputState = {
        externalValue: this.props.value,
        isComposing: false,
        localValue: this.props.value,
    }

    private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;

        this.setState({localValue: value});
        this.props.onChange?.(e);
    }

    public render() {
        const {inputRef, ...restProps} = this.props;

        return (<input
            {...restProps}
            ref={inputRef}
            onChange={this.handleChange}
                />);
    }
}
