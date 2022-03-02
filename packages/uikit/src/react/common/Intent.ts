export const Intent = {
    NONE: 'none' as const,
    PRIMARY: 'primary' as const,
    SUCCESS: 'success' as const,
    WARNING: 'warning' as const,
    DANGER: 'danger' as const,
}
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Intent = typeof Intent[keyof typeof Intent];

export function intentClass(intent: Intent): string;
export function intentClass(intent: typeof Intent.NONE | undefined): undefined;
export function intentClass(intent: Intent | undefined): Intent | undefined;
export function intentClass(intent: Intent | undefined) {
    if (intent == null || intent === Intent.NONE) {
        return undefined
    }
    return `intent-${intent.toLowerCase()}`
}
