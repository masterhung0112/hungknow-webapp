import * as React from "react";
import classNames from "classnames";

export interface INavMenuItemProps {
    /** CSS classes to apply to the root element, for proper appearance in the tree. */
    className: string;

    /** Link URL. */
    href: string;

    /** Whether this item is the active section (currently being viewed) */
    isActive: boolean;

    /** Whether this section is expanded (it or a child is being viewed) */
    isExpanded: boolean;

    /** Click handler for item, to navigate to URL. */
    onClick: () => void;

    /** The section for this menu item, either a page or a heading node. */
    title: string;
}

export const NavMenuItem: React.FC<INavMenuItemProps> = props => {
    const { className, isActive, isExpanded, title, ...htmlProps } = props;
    return (
        <a className={classNames("menu-item", className)} {...htmlProps}>
            <span>{title}</span>
            {props.children}
        </a>
    );
};