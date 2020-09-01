import { Intent } from './intent';
import { IconName } from "@blueprintjs/icons";

/**
 * Alias for a `JSX.Element` or a value that renders nothing.
 *
 * In React, `boolean`, `null`, and `undefined` do not produce any output.
 */
export type MaybeElement = JSX.Element | false | null | undefined;

/**
 * A shared base interface for all Blueprint component props.
 */
export interface IProps {
    /** A space-delimited list of class names to pass along to a child element. */
    className?: string;
}

export interface IIntentProps {
    /** Visual intent color to apply to element. */
    intent?: Intent;
}

/**
 * Interface for a clickable action, such as a button or menu item.
 * These props can be spready directly to a `<Button>` or `<MenuItem>` element.
 */
export interface IActionProps extends IIntentProps, IProps {
    /** Whether this action is non-interactive. */
    disabled?: boolean;

    /** Name of a Blueprint UI icon (or an icon element) to render before the text. */
    icon?: IconName | MaybeElement;

    /** Click event handler. */
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;

    /** Action text. Can be any single React renderable. */
    text?: React.ReactNode;
}