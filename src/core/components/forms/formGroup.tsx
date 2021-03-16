import { AbstractPureComponent, CssClasses, IIntentProps, IProps } from 'common'
import React from 'react'
import cx from 'classnames'

export interface FormGroupProps extends IIntentProps, IProps {
  /** CSS properties to apply to the root element. */
  style?: React.CSSProperties

  /**
   * Whether form group should appear as non-interactive.
   * Remember that `input` elements must be disabled separately.
   */
  disabled?: boolean

  /** Whether to render the label and children on a single line. */
  inline?: boolean

  /**
   * A space-delimited list of class names to pass along to the
   * `Classes.FORMGROUP_CONTENT` element that contains `children`.
   */
  contentClassName?: string

  /** Label of this form group. */
  label?: React.ReactNode

  /**
   * `id` attribute of the labelable form element that this `FormGroup` controls,
   * used as `<label for>` attribute.
   */
  labelFor?: string

  /**
   * Optional secondary text that appears after the label.
   */
  labelInfo?: React.ReactNode

  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>

  /**
   * Optional helper text. The given content will be wrapped in
   * `Classes.FORM_HELPER_TEXT` and displayed beneath `children`.
   * Helper text color is determined by the `intent`.
   */
  helperText?: React.ReactNode
}

export default class FormGroup extends AbstractPureComponent<FormGroupProps> {
  render() {
    const {
      style,
      intent,
      className,
      disabled,
      inline,
      contentClassName,
      label,
      labelFor,
      labelInfo,
      labelProps,
      helperText,
      children,
    } = this.props

    const classname = cx(
      CssClasses.FORMGROUP,
      CssClasses.intentClass(intent),
      {
        [CssClasses.DISABLED]: disabled,
        [CssClasses.INLINE]: inline,
      },
      className
    )

    const childrenClassName = cx({
      [CssClasses.DISABLED]: disabled,
    })

    return (
      <div className={classname} style={style}>
        {label && (
          <label className={CssClasses.LABEL} htmlFor={labelFor} {...labelProps}>
            {label} <span className={CssClasses.TEXT_MUTED}>{labelInfo}</span>
          </label>
        )}
        <div className={cx(CssClasses.FORMGROUP_CONTENT, contentClassName)}>
          {children}
          {helperText && <div className={CssClasses.FORMGROUP_HELPER_TEXT}>{helperText}</div>}
        </div>
      </div>
    )
  }
}
