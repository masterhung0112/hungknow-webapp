import React, { useCallback } from "react";

export type ButtonType = "button" | "reset" | "submit";

export interface AnchorOptions {
  href?: string;
  rel?: string;
  target?: string;
}

export interface UseButtonPropsOptions extends AnchorOptions {
  type?: ButtonType;
  disabled?: boolean;
  onClick?: React.EventHandler<React.MouseEvent | React.KeyboardEvent>;
  tabIndex?: number;
  tagName?: keyof JSX.IntrinsicElements;
}

export interface AriaButtonProps {
  type?: ButtonType | undefined;
  disabled: boolean | undefined;
  role?: "button";
  tabIndex?: number | undefined;
  href?: string | undefined;
  target?: string | undefined;
  rel?: string | undefined;
  "aria-disabled"?: true | undefined;
  onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

export interface UseButtonPropsMetadata {
  tagName: React.ElementType;
}

export function isTrivialHref(href?: string) {
  return !href || href.trim() === "#";
}

export function useButtonProps({
  type,
  disabled,
  onClick,
  tabIndex,
  tagName,
  href,
  rel,
  target,
}: UseButtonPropsOptions): [AriaButtonProps, UseButtonPropsMetadata] {
  // Select the tag name based on it's a link or a button
  if (!tagName) {
    if (href != null || target != null || rel != null) {
      tagName = "a";
    } else {
      tagName = "button";
    }
  }

  const meta: UseButtonPropsMetadata = { tagName };
  if (tagName === "button") {
    return [{ type: (type as any) || "button", disabled }, meta];
  }

  const handleClick = useCallback(
    (event: React.MouseEvent | React.KeyboardEvent) => {
      if (disabled || (tagName === "a" && isTrivialHref(href))) {
        event.preventDefault();
      }

      if (disabled) {
        event.stopPropagation();
        return;
      }

      onClick?.(event);
    },
    [disabled, onClick]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === " ") {
        event.preventDefault();
        handleClick(event);
      }
    },
    [handleClick]
  );

  return [
    {
      role: "button",
      disabled: undefined,
      tabIndex: disabled ? undefined : tabIndex,
      href,
      target: tagName === "a" ? target : undefined,
      "aria-disabled": !disabled ? undefined : disabled,
      rel: tagName === "a" ? rel : undefined,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
    },
    meta,
  ];
}
