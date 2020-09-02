import { Alignment } from './alignment';
import { Intent } from './intent';

export const NS = process.env.HUNGKNOW_NAMESPACE || process.env.REACT_APP_HUNGKNOW_NAMESPACE || "hk";

// modifiers
export const ACTIVE = `${NS}-active`;
export const DISABLED = `${NS}-disabled`;
export const FILL = `${NS}-fill`;
export const LARGE = `${NS}-large`;
export const LOADING = `${NS}-loading`;
export const MINIMAL = `${NS}-minimal`;
export const OUTLINED = `${NS}-outlined`;
export const SMALL = `${NS}-small`;
export const ALIGN_LEFT = `${NS}-align-left`;
export const ALIGN_RIGHT = `${NS}-align-right`;

/***********
 * COMPONENTS
 */
export const BUTTON = `${NS}-button`;
export const BUTTON_SPINNER = `${BUTTON}-spinner`;
export const BUTTON_TEXT = `${BUTTON}-text`;

export const ICON = `${NS}-icon`;
export const ICON_STANDARD = `${ICON}-standard`;
export const ICON_LARGE = `${ICON}-large`;

export const SPINNER = `${NS}-spinner`;
export const SPINNER_ANIMATION = `${SPINNER}-animation`;
export const SPINNER_HEAD = `${SPINNER}-head`;
export const SPINNER_NO_SPIN = `${NS}-no-spin`;
export const SPINNER_TRACK = `${SPINNER}-track`;


/** Return CSS class for alignment. */
export function alignmentClass(alignment: Alignment) {
    switch (alignment) {
        case Alignment.LEFT:
            return ALIGN_LEFT;
        case Alignment.RIGHT:
            return ALIGN_RIGHT;
        default:
            return undefined;
    }
}

/** Return CSS class for intent. */
export function intentClass(intent?: Intent) {
    if (intent == null || intent === Intent.NONE) {
        return undefined;
    }
    return `${NS}-intent-${intent.toLowerCase()}`;
}

/** Returns CSS class for icon name. */
export function iconClass(iconName?: string) {
    if (iconName == null) {
        return undefined;
    }
    return iconName.indexOf(`${NS}-icon-`) === 0 ? iconName : `${NS}-icon-${iconName}`;
}