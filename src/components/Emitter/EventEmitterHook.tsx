import { EventEmitterContext, EventEmitterProvider, EventEmitterValue } from './EventEmitterProvider'

// eslint-disable-next-line @typescript-eslint/ban-types
export const withEventEmitterProvider = <T extends {} = {}>(Component: React.ComponentType<T>) => {
  return (props: T) => {
    return (
      <EventEmitterProvider>
        <Component {...(props as any)} />
      </EventEmitterProvider>
    )
  }
}

export const withEventEmitter = <T extends EventEmitterValue>(Component: React.ComponentType<T>) => {
  return (props: Omit<T, keyof EventEmitterValue>) => {
    return (
      <EventEmitterContext.Consumer>
        {(context) => {
          return <Component {...context} {...(props as any)} />
        }}
      </EventEmitterContext.Consumer>
    )
  }
}
