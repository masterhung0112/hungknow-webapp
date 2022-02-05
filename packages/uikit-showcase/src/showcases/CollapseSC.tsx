import React, { useState } from 'react'
import { Button, Collapse } from '@hungknow/uikit'

export const CollapseSC: React.VFC = ({ }) => {
    const [isOpen, setOpen] = useState(false)

    return (
        <>
            <Button onClick={() => setOpen(!isOpen)}>{isOpen ? 'Hide' : 'Show'} Content</Button>
            <Collapse isOpen={isOpen} transitionDuration={400}>
                <div style={{ height: '300px', backgroundColor: 'gray' }}>
                    <h1>Hello World</h1>
                </div>
            </Collapse>
        </>
    )
}