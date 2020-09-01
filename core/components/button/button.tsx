import React from 'react'
import { AbstractButton, IButtonProps } from './abstractButton';

export class Button extends AbstractButton<React.ButtonHTMLAttributes<HTMLButtonElement>> {

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