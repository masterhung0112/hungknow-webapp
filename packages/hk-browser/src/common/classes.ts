import {Alignment} from './alignment';
import {Intent} from './intent';

export const NS = process.env.HUNGKNOW_NAMESPACE || process.env.REACT_APP_HUNGKNOW_NAMESPACE || 'hk';

// modifiers
export const ACTIVE = `${NS}-active`;
export const DISABLED = `${NS}-disabled`;
export const FILL = `${NS}-fill`;
export const INLINE = `${NS}-inline`;
export const LARGE = `${NS}-large`;
export const LOADING = `${NS}-loading`;
export const MINIMAL = `${NS}-minimal`;
export const OUTLINED = `${NS}-outlined`;
export const ROUND = `${NS}-round`;
export const SMALL = `${NS}-small`;
export const ALIGN_LEFT = `${NS}-align-left`;
export const ALIGN_RIGHT = `${NS}-align-right`;

export const TEXT_MUTED = `${NS}-text-muted`;

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
        return '';
    }
}

/** Return CSS class for intent. */
export function intentClass(intent?: Intent) {
    if (intent == null || intent === Intent.NONE) {
        return '';
    }
    return `${NS}-intent-${intent.toLowerCase()}`;
}

/** Returns CSS class for icon name. */
export function iconClass(iconName?: string) {
    if (iconName == null) {
        return '';
    }
    return iconName.indexOf(`${NS}-icon-`) === 0 ? iconName : `${NS}-icon-${iconName}`;
}

export const INTENT_PRIMARY = intentClass(Intent.PRIMARY);
export const INTENT_SUCCESS = intentClass(Intent.SUCCESS);
export const INTENT_WARNING = intentClass(Intent.WARNING);
export const INTENT_DANGER = intentClass(Intent.DANGER);

export const FOCUS_DISABLED = `${NS}-focus-disabled`;

/*****
 * forms
 */
export const LABEL = `${NS}-label`;
export const FORMGROUP = `${NS}-form-group`;
export const FORMGROUP_CONTENT = `${FORMGROUP}__content`;
export const FORMGROUP_HELPER_TEXT = `${FORMGROUP}__helper-text`;
export const FORMGROUP_SMALL = `${FORMGROUP}--small`;

export const FORMGROUP_HAS_ERROR = `${NS}-has-error`;

export const FORMCONTROL = `${NS}-form-control`;
export const FORMCONTROL_SMALL = `${FORMCONTROL}--sm`;

export const FORMLEGEND = `${NS}-form-legend`;

export const INPUT = `${NS}-input`;
export const INPUT_GHOST = `${INPUT}-ghost`;
export const INPUT_GROUP = `${INPUT}-group`;
export const INPUT_LEFT_CONTAINER = `${INPUT}__left-container`;
export const INPUT_ACTION = `${INPUT}-action`;
