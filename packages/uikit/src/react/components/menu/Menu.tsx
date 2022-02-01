import React from 'react'

export interface MenuProps {
    large?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Menu: React.FC<MenuProps> = ({large, children, ...htmlProps}) => {
    return <ul {...htmlProps} className='hk1 menu'>{children}</ul>
}