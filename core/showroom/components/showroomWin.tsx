import React from "react";
import cx from "classnames";
import * as ShowroomCssClasses from "../CssClasses";
import { IProps } from "common";

export interface ShowroomWinProps extends IProps {
  /**
   * Identifier of this showroom window.
   * This will appear as the `data-showroom-win-id` attribute on the DOM element.
   */
  id: string;

  /**
   * HTML markup for the example, which will be directly injected into the
   * showroom win container using `dangerouslySetInnerHTML`.
   *
   * This prop is mutually exclusive with and takes priority over `children`.
   */
  html?: string;
}

export type ShowroomWinState = Record<string, any>;

/**
 * Container for an example and its options.
 *
 * ```tsx
 * import { Example, IExampleProps } from "@blueprintjs/docs-theme";
 * // use IExampleProps as your props type,
 * // then spread it to <Example> below
 * export class Example extends React.PureComponent<IExampleProps, [your state]> {
 *     public render() {
 *         const options = (
 *             <>
 *                  --- render options here ---
 *             </>
 *         );
 *         return (
 *             <ShowroomWin options={options} {...this.props}>
 *                 --- render examples here ---
 *             </Example>
 *         );
 *     }
 * ```
 */
export default class ShowroomWin extends React.PureComponent<
  ShowroomWinProps,
  ShowroomWinState
> {
  render() {
    const {
      children,
      className,
      id,

      html,
      // spread any additional props through to the root element,
      // to support decorators that expect DOM props.
      ...htmlProps
    } = this.props;

    const classes = cx(ShowroomCssClasses.SHOWROOM_WIN, className);

    return (
      <div className={classes} data-showroom-win-id={id} {...htmlProps}>
        {html == null ? (
          <div className={ShowroomCssClasses.SHOWROOM_WIN_CONTENT}>
            {children}
          </div>
        ) : (
          <div
            className={ShowroomCssClasses.SHOWROOM_WIN_CONTENT}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>
    );
  }
}
