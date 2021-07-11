import React from 'react';
import {
    AbstractPureComponent,
    CssClasses,
    HTMLInputProps,
    IControlledProps,
    IIntentProps,
    IProps,
    IRef,
    MaybeElement,
    removeNonHTMLProps,
} from 'common';

import {IconName} from '@blueprintjs/icons';

import cx from 'classnames';

import Icon from '../icon';

import {AsyncControllableInput} from './asyncControllableInput';

export interface IInputGroupProps extends IControlledProps, IIntentProps, IProps {

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

    /**
   * Whether the input is non-interactive.
   * Note that `rightElement` must be disabled separately; this prop will not affect it.
   * @default false
   */
    disabled?: boolean;

    /**
   * Whether the component should take up the full width of its container.
   */
    fill?: boolean;

    /** Whether this input should use large styles. */
    large?: boolean;

    /** Whether this input should use small styles. */
    small?: boolean;

    /** Placeholder text in the absence of any value. */
    placeholder?: string;

    /** Whether the input (and any buttons) should appear with rounded caps. */
    round?: boolean;

    /**
   * HTML `input` type attribute.
   * @default "text"
   */
    type?: string;
}

export interface IInputGroupState {
    leftElementWidth?: number;
    rightElementWidth?: number;
}

export default class InputGroup extends AbstractPureComponent<IInputGroupProps & HTMLInputProps, IInputGroupState> {
    public state: IInputGroupState = {}

    private leftElement: HTMLElement
    private rightElement: HTMLElement

    private refHandlers = {
        leftElement: (ref: HTMLSpanElement) => (this.leftElement = ref),
        rightElement: (ref: HTMLSpanElement) => (this.rightElement = ref),
    }

    private maybeRenderLeftElement() {
        const {leftElement, leftIcon} = this.props;

        if (leftElement != null) {
            return (
                <span
                    className={CssClasses.INPUT_LEFT_CONTAINER}
                    ref={this.refHandlers.leftElement}
                >
                    {leftElement}
                </span>
            );
        } else if (leftIcon != null) {
            return <Icon icon={leftIcon}/>;
        }

        return undefined;
    }

    public componentDidMount() {
        this.updateInputWidth();
    }

    public componentDidUpdate(prevProps: IInputGroupProps & HTMLInputProps) {
        const {leftElement, rightElement} = this.props;
        if (prevProps.leftElement !== leftElement || prevProps.rightElement !== rightElement) {
            this.updateInputWidth();
        }
    }

    private updateInputWidth() {
        const {leftElementWidth, rightElementWidth} = this.state;

        if (this.leftElement != null) {
            const {clientWidth} = this.leftElement;

            // small threshold to prevent infinite loops
            if (leftElementWidth === undefined || Math.abs(clientWidth - leftElementWidth) > 2) {
                this.setState({leftElementWidth: clientWidth});
            }
        } else {
            this.setState({leftElementWidth: undefined});
        }

        if (this.rightElement != null) {
            const {clientWidth} = this.rightElement;

            // small threshold to prevent infinite loops
            if (rightElementWidth === undefined || Math.abs(clientWidth - rightElementWidth) > 2) {
                this.setState({rightElementWidth: clientWidth});
            }
        } else {
            this.setState({rightElementWidth: undefined});
        }
    }

    public render() {
        const {className, inputRef, rightElement, intent, disabled, fill, large, small, round} = this.props;

        const classes = cx(
            CssClasses.INPUT_GROUP,
            CssClasses.intentClass(intent),
            {
                [CssClasses.DISABLED]: disabled,
                [CssClasses.FILL]: fill,
                [CssClasses.LARGE]: large,
                [CssClasses.SMALL]: small,
                [CssClasses.ROUND]: round,
            },
            className,
        );

        const style: React.CSSProperties = {
            ...this.props.style,
            paddingLeft: this.state.leftElementWidth,
            paddingRight: this.state.rightElementWidth,
        };

        return (
            <div className={classes}>
                {this.maybeRenderLeftElement()}
                <AsyncControllableInput
                    type='text'
                    {...removeNonHTMLProps(this.props)}
                    className={CssClasses.INPUT}
                    inputRef={inputRef}
                    style={style}
                />
                {rightElement ? (
                    <span
                        className={CssClasses.INPUT_ACTION}
                        ref={this.refHandlers.rightElement}
                    >
                        {rightElement}
                    </span>
                ) : null}
            </div>
        );
    }
}
