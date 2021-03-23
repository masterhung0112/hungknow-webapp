import React from 'react'

export type EventHandler = (
  events: Record<string, any>
) => {
  events: Record<string, any>
}

export type EventEmitCall = (key: string, detail: any) => void
export type EventCall = (key: string, handle: HandleType) => void
export type HandleType = (detail: any) => void

const addEvent = (key: string, handle: HandleType): EventHandler => ({ events }) => {
  const nextEvents = { ...events }

  const currentHandles = events[key] || []
  nextEvents[key] = [...currentHandles, handle]

  return { events: nextEvents }
}

const removeEvent = (key: string, handle: HandleType): EventHandler => ({ events }) => {
  const nextEvents: Record<string, any> = {}

  for (const currentKey in events) {
    if (currentKey === key) {
      const nextHandles = []

      for (const currentHandle of events[currentKey]) {
        if (currentHandle !== handle) {
          nextHandles.push(currentHandle)
        }
      }

      nextEvents[currentKey] = nextHandles
    }
  }

  return { events: nextEvents }
}

const callEvent = (handlers: HandleType[] = []): any => ({ detail }: { detail: any }) => {
  for (const handle of handlers) {
    handle(detail)
  }
}

export type EventProviderProps = {
  element: any
}

export type EventEmitterValue = { emit: EventEmitCall; on: EventCall; off: EventCall }
export const EventEmitterContext = React.createContext<EventEmitterValue>(null)

export class EventEmitterProvider extends React.Component<
  EventProviderProps,
  {
    events: any
    element: any
  }
> {
  constructor(props: EventProviderProps) {
    super(props)
    this.state = {
      events: {},
      element: props.element || window,
    }
  }

  emit(name: string, props: any) {
    const element = this.state.element
    const handle = callEvent(this.state.events[name])
    const event = new CustomEvent(name, { detail: props })
    element.addEventListener(name, handle)
    element.dispatchEvent(event)
    element.removeEventListener(name, handle)
  }

  on(name: string, handle: HandleType) {
    this.setState(addEvent(name, handle))
  }

  off(name: string, handle: HandleType) {
    this.setState(removeEvent(name, handle))
  }

  render() {
    return (
      <EventEmitterContext.Provider
        value={{
          emit: (name, props) => this.emit(name, props),
          on: (name, handle) => this.on(name, handle),
          off: (name, handle) => this.off(name, handle),
        }}
      >
        {this.props.children}
      </EventEmitterContext.Provider>
    )
  }
}
