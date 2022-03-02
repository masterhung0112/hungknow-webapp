import React from 'react'
import { AbstractButton, AbstractButtonProps } from './AbstractButton'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & Omit<AbstractButtonProps, 'tagName'>

export const Button: React.VFC<ButtonProps> = ({...props}) => {
    return <AbstractButton tagName="button" {...props} />
}
