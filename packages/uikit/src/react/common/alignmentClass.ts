import { Alignment } from './Alignment'
import { ALIGN_LEFT, ALIGN_RIGHT } from './cssClasses'

/** Return CSS class for alignment. */
export function alignmentClass(alignment: Alignment | undefined) {
    switch (alignment) {
        case Alignment.LEFT:
            return ALIGN_LEFT
        case Alignment.RIGHT:
            return ALIGN_RIGHT
        default:
            return undefined
    }
}
