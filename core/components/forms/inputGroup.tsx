import React from 'react';
import { AbstractPureComponent, CssClasses, HTMLInputProps, IRef, MaybeElement, removeNonHTMLProps } from 'common';
import { AsyncControllableInput } from './asyncControllableInput';
import { IconName } from '@blueprintjs/icons';
import Icon from '../icon';

export interface IInputGroupProps {
    /** Ref handler or a ref object that receives HTML `<input>` element backing this component. */
    inputRef?: IRef<HTMLInputElement>;

    /**
     * Element to render on the left side of input.  This prop is mutually exclusive
     * with `leftIcon`.
     */
    leftElement?: JSX.Element;

    /**
     * Name of a Blueprint UI icon to render on the left side of the input group,
     * before the user's cursor.  This prop is mutually exclusive with `leftElement`.
     * Usage with content is deprecated.  Use `leftElement` for elements.
     */
    leftIcon?: IconName | MaybeElement;

    /**
     * Element to render on right side of input.
     * For best results, use a minimal button, tag, or small spinner.
     */
    rightElement?: JSX.Element;
}

export interface IInputGroupState {
}

export class InputGroup extends AbstractPureComponent<IInputGroupProps & HTMLInputProps, IInputGroupState> {
    public state: IInputGroupState = {};

    private leftElement: HTMLElement;
    private rightElement: HTMLElement;

    private refHandlers = {
        leftElement: (ref: HTMLSpanElement) => (this.leftElement = ref),
        rightElement: (ref: HTMLSpanElement) => (this.rightElement = ref),
    };

    private maybeRenderLeftElement() {
        const { leftElement, leftIcon } = this.props;

        if (leftElement != null) {
            return (
                <span className={CssClasses.INPUT_LEFT_CONTAINER} ref={this.refHandlers.leftElement}>
                    {leftElement}
                </span>
            );
        } else if (leftIcon != null) {
            return <Icon icon={leftIcon} />;
        }

        return undefined;
    }

    private maybeRenderRightElement() {
        const { rightElement } = this.props;
        if (rightElement == null) {
            return undefined;
        }
        return (
            <span className={CssClasses.INPUT_ACTION} ref={this.refHandlers.rightElement}>
                {rightElement}
            </span>
        );
    }

    public render() {
        const {
            inputRef
        } = this.props

        const style: React.CSSProperties = {
            ...this.props.style,
            // paddingLeft: this.state.leftElementWidth,
            // paddingRight: this.state.rightElementWidth,
        };

        return (
            <div>
                {this.maybeRenderLeftElement()}
                <AsyncControllableInput
                    type='text'
                    {...removeNonHTMLProps(this.props)}
                    className={CssClasses.INPUT}
                    inputRef={inputRef}
                    style={style}
                />
                {this.maybeRenderRightElement()}
            </div>
        )
    }
}