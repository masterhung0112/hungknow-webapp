import React from 'react'
import { AbstractButton } from './abstractButton';
import { removeNonHTMLProps, IRefObject, isRefObject, IRefCallback } from 'common';

export class Button extends AbstractButton<React.ButtonHTMLAttributes<HTMLButtonElement>> {

    protected buttonRef: HTMLButtonElement | IRefObject<HTMLButtonElement> | null;
    protected handleRef = isRefObject<HTMLButtonElement>(this.props.elementRef)
        ? (this.buttonRef = this.props.elementRef)
        : (ref: HTMLButtonElement | null) => {
              this.buttonRef = ref;
              (this.props.elementRef as IRefCallback)?.(ref);
          };

    public render() {
        const commonProps = this.getCommonButtonProps();

        return (
            <button
                type="button"
                ref={this.handleRef}
                {...removeNonHTMLProps(this.props)}
                {...this.getCommonButtonProps()}
            >
                {this.renderChildren()}
            </button>
        );
    }
}