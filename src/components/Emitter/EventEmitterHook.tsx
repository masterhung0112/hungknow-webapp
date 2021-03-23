import { EventEmitterContext, EventEmitterValue } from './EventEmitterProvider'

export const withEventEmitter = <T extends EventEmitterValue>(Component: React.ComponentType<T>) => {
  return (props: Omit<T, keyof EventEmitterValue>) => {
    return (
      <EventEmitterContext.Consumer>
        {(context) => <Component {...context} {...(props as any)} />}
      </EventEmitterContext.Consumer>
    )
  }
}
