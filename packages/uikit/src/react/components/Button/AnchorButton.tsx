import React from 'react'
import { AbstractButton, AbstractButtonProps } from './AbstractButton'
import { AnchorOptions } from './useButtonProps'

export type AnchorButtonProps = AnchorOptions & React.AnchorHTMLAttributes<HTMLAnchorElement> & Omit<AbstractButtonProps, 'tagName'>

export const AnchorButton: React.VFC<AnchorButtonProps> = ({disabled, href, ...props}) => {
    return <AbstractButton href={disabled ? undefined: href} {...props} />
}