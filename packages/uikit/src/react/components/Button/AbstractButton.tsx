import React, { PropsWithChildren } from "react";
import clsx from "clsx";

import { ActionProps } from "../../common/ActionProps";
import { MaybeElement } from "../../common/MaybeElement";
import { isReactNodeEmpty } from "../../utils/reactUtils";
import { Icon } from "../Icon/Icon";
import { IconName } from "../../common/IconName";
import { Props } from "../../common/Props";
import { IntentProps } from "../../common/IntentProps";
import { intentClass } from "../../common/Intent";
import { MINIMAL } from "../../common/cssClasses";
import {
  AriaButtonProps,
  useButtonProps,
  UseButtonPropsMetadata,
} from "./useButtonProps";
import {
  ChildrenFn,
  ChildrenFnProps,
  isChildrenFn,
} from "../../utils/isChildrenFn";

export interface AbstractButtonProps extends IntentProps, ActionProps, Props {
  //   tagName: string;
  active?: boolean;
  fill?: boolean;
  loading?: boolean;
  minimal?: boolean;
  rightIcon?: IconName | MaybeElement;
  type?: "submit" | "reset" | "button";
}
// PropsWithChildren<
//   AbstractButtonProps &
//     (P extends HTMLButtonElement
//       ? React.ButtonHTMLAttributes<HTMLButtonElement>
//       : React.AnchorHTMLAttributes<HTMLAnchorElement>)

//  P extends
//     | HTMLButtonElement
//     | (HTMLAnchorElement &
//         ChildrenFnProps<AriaButtonProps, UseButtonPropsMetadata>)
export const AbstractButton = React.forwardRef<
  HTMLElement,
  PropsWithChildren<
    AbstractButtonProps &
      (
        | React.ButtonHTMLAttributes<HTMLButtonElement>
        | React.AnchorHTMLAttributes<HTMLAnchorElement>
      )
  >
>(
  (
    {
      active,
      fill,
      loading,
      minimal,
      rightIcon,
      text,
      children,
      icon,
      className,
      intent,
      ...htmlProps
    },
    ref
  ) => {
    const [buttonProps, buttonMeta] = useButtonProps({ ...htmlProps });

    if (isChildrenFn(children)) {
      return <>{children(buttonProps, buttonMeta)}</>;
    }
    const classes = clsx(
      "hk1 button",
      active && "active",
      fill && "fill",
      loading && "loading",
      minimal && MINIMAL,
      intent && intentClass(intent),
      className
    );

    return React.createElement(
      buttonMeta.tagName,
      {
        ...buttonProps,
        ...htmlProps,
        className: classes,
        ref: ref,
      },
      // loading && <
      <Icon key="leftIcon" icon={icon} />,
      (!isReactNodeEmpty(text) || !isReactNodeEmpty(children)) && (
        <span key="text" className={"hk1 button-text"}>
          {text}
          {children}
        </span>
      ),
      <Icon key="rightIcon" icon={rightIcon} />
    );
  }
);
AbstractButton.displayName = "AbstractButton";
