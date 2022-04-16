const noop = () => {}

export type MouseEvents = {
    [K in keyof GlobalEventHandlersEventMap]: GlobalEventHandlersEventMap[K] extends MouseEvent
        ? K
        : never
}[keyof GlobalEventHandlersEventMap]

export interface ClickOutsideOptions {
  disabled?: boolean;
  clickTrigger?: MouseEvents;
} 
  
export function useClickOutside(
    ref: React.RefObject<Element> | Element | null | undefined,
    onClickOutside: (e: Event) => void = noop,
    { disabled, clickTrigger = 'click' } : ClickOutsideOptions = {},
) {

}