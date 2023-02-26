import React, { FC } from 'react'

interface CodeExampleProps {
  className: string
}

export const CodeExample: FC<CodeExampleProps> = ({ children, className, ...rest }) => {
  return (
    <div
      className={`docs-example border ${className} ${
        className && className.includes('p-') ? '' : 'p-3'
      }`}
      {...rest}
    >
      {children}
    </div>
  )
}

CodeExample.displayName = 'CodeExample'

// export default CodeExample