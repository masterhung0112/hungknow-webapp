import React from 'react'
import classNames from 'classnames'
import { Alignment, CssClasses, AbstractPureComponent, IRef, IActionProps, MaybeElement, Keys, IRefObject, getRef, Utils } from 'common';
import { IconName } from '@blueprintjs/icons';
import Icon from '../icon';
import { Spinner } from '../spinner';

export interface IButtonProps extends IActionProps {
    /**
     * If set to `true`, the button will display in an active state.
     * This is equivalent to setting `className={CssClasses.ACTIVE}`.
     * @default false
     */
    active?: boolean;

     /**
     * Text alignment within button. By default, icons and text will be centered
     * within the button. Passing `"left"` or `"right"` will align the button
     * text to that side and push `icon` and `rightIcon` to either edge. Passing
     * `"center"` will center the text and icons together.
     * @default Alignment.CENTER
     */
    alignText?: Alignment;

    /** A ref handler or a ref object that receives the native HTML element backing this component. */
    elementRef?: IRef<any>;

    /** Whether this button should expand to fill its container. */
    fill?: boolean;

    /** Whether this button should use large styles. */
    large?: boolean;

    /**
     * If set to `true`, the button will display a centered loading spinner instead of its contents.
     * The width of the button is not affected by the value of this prop.
     * @default false
     */
    loading?: boolean;

    /** Whether this button should use minimal styles. */
    minimal?: boolean;

    /** Whether this button should use outlined styles. */
    outlined?: boolean;

    /** Name of a Blueprint UI icon (or an icon element) to render after the text. */
    rightIcon?: IconName | MaybeElement;

    /** Whether this button should use small styles. */
    small?: boolean;

    /**
     * HTML `type` attribute of button. Accepted values are `"button"`, `"submit"`, and `"reset"`.
     * Note that this prop has no effect on `AnchorButton`; it only affects `Button`.
     * @default "button"
     */
    type?: "submit" | "reset" | "button";
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

    protected abstract buttonRef: HTMLElement | IRefObject<HTMLElement> | null;

    private currentKeyDown: number = null;

    protected getCommonButtonProps() {
        const { alignText, fill, large, loading, outlined, minimal, small, tabIndex } = this.props;
        const disabled = this.props.disabled || loading;

        const className = classNames(
            CssClasses.BUTTON,
            {
                [CssClasses.ACTIVE]: this.state.isActive || this.props.active,
                [CssClasses.DISABLED]: disabled,
                [CssClasses.FILL]: fill,
                [CssClasses.LARGE]: large,
                [CssClasses.LOADING]: loading,
                [CssClasses.MINIMAL]: minimal,
                [CssClasses.OUTLINED]: outlined,
                [CssClasses.SMALL]: small,
            },
            CssClasses.alignmentClass(alignText),
            CssClasses.intentClass(this.props.intent),
            this.props.className,
        );

        return {
            className,
            disabled,
            onClick: disabled ? undefined : this.props.onClick,
            onKeyDown: this.handleKeyDown,
            onKeyUp: this.handleKeyUp,
            tabIndex: disabled ? -1 : tabIndex,
        };
    }

    // we're casting as `any` to get around a somewhat opaque safeInvoke error
    // that "Type argument candidate 'KeyboardEvent<T>' is not a valid type
    // argument because it is not a supertype of candidate
    // 'KeyboardEvent<HTMLElement>'."
    protected handleKeyDown = (e: React.KeyboardEvent<any>) => {
        // HACKHACK: https://github.com/palantir/blueprint/issues/4165
        if (Keys.isKeyboardClick(e.which)) {
            e.preventDefault();
            if (e.which !== this.currentKeyDown) {
                this.setState({ isActive: true });
            }
        }
        this.currentKeyDown = e.which;
        this.props.onKeyDown?.(e);
    };

    protected handleKeyUp = (e: React.KeyboardEvent<any>) => {
        // HACKHACK: https://github.com/palantir/blueprint/issues/4165
        if (Keys.isKeyboardClick(e.which)) {
            this.setState({ isActive: false });
            getRef(this.buttonRef).click();
        }
        this.currentKeyDown = null;
        this.props.onKeyUp?.(e);
    };

    protected renderChildren(): React.ReactNode {
        const { children, icon, loading, rightIcon, text } = this.props;
        return [
            loading && <Spinner key="loading" className={CssClasses.BUTTON_SPINNER} size={Icon.SIZE_LARGE} />,
            <Icon key="leftIcon" icon={icon} />,
            (!Utils.isReactNodeEmpty(text) || !Utils.isReactNodeEmpty(children)) && (
                <span key="text" className={CssClasses.BUTTON_TEXT}>
                    {text}
                    {children}
                </span>
            ),
            <Icon key="rightIcon" icon={rightIcon} />,
        ];
    }

    public abstract render(): JSX.Element;
}