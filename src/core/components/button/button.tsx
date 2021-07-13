import React from 'react';

import {removeNonHTMLProps, IRefObject, isRefObject, IRefCallback} from 'common';

import {AbstractButton} from './abstractButton';

export class Button extends AbstractButton<React.ButtonHTMLAttributes<HTMLButtonElement>> {
    protected buttonRef: HTMLButtonElement | IRefObject<HTMLButtonElement> | null = null
    protected handleRef = isRefObject<HTMLButtonElement>(this.props.elementRef) ?
        (this.buttonRef = this.props.elementRef) :
        (ref: HTMLButtonElement | null) => {
            this.buttonRef = ref
            ;(this.props.elementRef as IRefCallback)?.(ref);
        }

    public render() {
        // const commonProps = this.getCommonButtonProps();

        return (
            <button
                type='button'
                ref={this.handleRef}
                {...removeNonHTMLProps(this.props)}
                {...this.getCommonButtonProps()}
            >
                {this.renderChildren()}
            </button>
        );
    }
}

export class AnchorButton extends AbstractButton<React.AnchorHTMLAttributes<HTMLAnchorElement>> {
    // public static displayName = `${DISPLAYNAME_PREFIX}.AnchorButton`;

    protected buttonRef: HTMLAnchorElement | IRefObject<HTMLAnchorElement> | null
    protected handleRef = isRefObject<HTMLAnchorElement>(this.props.elementRef) ?
        (this.buttonRef = this.props.elementRef) :
        (ref: HTMLAnchorElement | null) => {
            this.buttonRef = ref
            ;(this.props.elementRef as IRefCallback)?.(ref);
        }

    public render() {
        const {href, tabIndex = 0} = this.props;
        const commonProps = this.getCommonButtonProps();

        return (
            <a
                role='button'
                ref={this.handleRef}
                {...removeNonHTMLProps(this.props)}
                {...commonProps}
                href={commonProps.disabled ? undefined : href}
                tabIndex={commonProps.disabled ? -1 : tabIndex}
            >
                {this.renderChildren()}
            </a>
        );
    }
}
