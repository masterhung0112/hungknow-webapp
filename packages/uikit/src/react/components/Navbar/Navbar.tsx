import React from "react";
import clsx from "clsx";
import { Props } from "../../common/Props";
import { FIXED_TOP, NAVBAR, VERTICAL } from "../../common/cssClasses";

export interface NavbarProps
  extends Props,
    React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether this navbar should be fixed to the top of the viewport (using CSS `position: fixed`).
   */
  fixedToTop?: boolean;

  vertical?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  fixedToTop,
  vertical,
  children,
  className,
  ...htmlProps
}) => {
  const navbarClasses = clsx(
    NAVBAR,
    fixedToTop && FIXED_TOP,
    vertical && VERTICAL,
    className
  );

  return (
    <div className={navbarClasses} {...htmlProps}>
      {children}
    </div>
  );
};
Navbar.displayName = "Navbar";
