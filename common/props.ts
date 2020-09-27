import React from 'react'
import { Intent } from './intent'
import { IconName } from '@blueprintjs/icons'

/**
 * Alias for all valid HTML props for `<div>` element.
 * Does not include React's `ref` or `key`.
 */
export type HTMLDivProps = React.HTMLAttributes<HTMLDivElement>

/**
 * Alias for all valid HTML props for `<input>` element.
 * Does not include React's `ref` or `key`.
 */
export type HTMLInputProps = React.InputHTMLAttributes<HTMLInputElement>

/**
 * Alias for a `JSX.Element` or a value that renders nothing.
 *
 * In React, `boolean`, `null`, and `undefined` do not produce any output.
 */
export type MaybeElement = JSX.Element | false | null | undefined

/**
 * A shared base interface for all Blueprint component props.
 */
export interface IProps {
  /** A space-delimited list of class names to pass along to a child element. */
  className?: string
}

export interface IIntentProps {
  /** Visual intent color to apply to element. */
  intent?: Intent
}

/** Interface for a controlled input. */
export interface IControlledProps {
  /** Initial value of the input, for uncontrolled usage. */
  defaultValue?: string

  /** Change event handler. Use `event.target.value` for new value. */
  onChange?: React.FormEventHandler<HTMLElement>

  /** Form value of the input, for controlled usage. */
  value?: string
}

/**
 * Interface for a clickable action, such as a button or menu item.
 * These props can be spready directly to a `<Button>` or `<MenuItem>` element.
 */
export interface IActionProps extends IIntentProps, IProps {
  /** Whether this action is non-interactive. */
  disabled?: boolean

  /** Name of a Blueprint UI icon (or an icon element) to render before the text. */
  icon?: IconName | MaybeElement

  /** Click event handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void

  /** Action text. Can be any single React renderable. */
  text?: React.ReactNode
}

/** A collection of curated prop keys used across our Components which are not valid HTMLElement props. */
const INVALID_PROPS = [
  'active',
  'alignText',
  'containerRef',
  'current',
  'elementRef',
  'fill',
  'icon',
  'inputRef',
  'intent',
  'inline',
  'large',
  'loading',
  'leftElement',
  'leftIcon',
  'minimal',
  'onRemove', // ITagProps, ITagInputProps
  'outlined', // IButtonProps
  'panel', // ITabProps
  'panelClassName', // ITabProps
  'popoverProps',
  'rightElement',
  'rightIcon',
  'round',
  'small',
  'text',
]

/**
 * Typically applied to HTMLElements to filter out disallowed props. When applied to a Component,
 * can filter props from being passed down to the children. Can also filter by a combined list of
 * supplied prop keys and the denylist (only appropriate for HTMLElements).
 * @param props The original props object to filter down.
 * @param {string[]} invalidProps If supplied, overwrites the default denylist.
 * @param {boolean} shouldMerge If true, will merge supplied invalidProps and denylist together.
 */
export function removeNonHTMLProps(
  props: { [key: string]: any },
  invalidProps = INVALID_PROPS,
  shouldMerge = false
): { [key: string]: any } {
  if (shouldMerge) {
    invalidProps = invalidProps.concat(INVALID_PROPS)
  }

  return invalidProps.reduce(
    (prev, curr) => {
      // Props with hyphens (e.g. data-*) are always considered html props
      if (curr.indexOf('-') !== -1) {
        return prev
      }

      if (Object.prototype.hasOwnProperty.call(prev, curr)) {
        delete (prev as any)[curr]
      }
      return prev
    },
    { ...props }
  )
}