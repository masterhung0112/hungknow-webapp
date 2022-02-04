import React from 'react'
import { AbstractButton, AbstractButtonProps } from './AbstractButton'

export type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & Omit<AbstractButtonProps, 'tagName'>

export const AnchorButton: React.VFC<AnchorButtonProps> = ({disabled, href, ...props}) => {
    return <AbstractButton tagName="a" role="button" href={disabled ? undefined: href} {...props} />
}