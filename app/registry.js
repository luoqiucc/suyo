'use client'

import { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { StyleRegistry, createStyleRegistry } from 'styled-jsx'

// TODO
export default function StyledJsxRegistry({ children }) {
    const [jsxStyleRegistry] = useState(() => createStyleRegistry())

    useServerInsertedHTML(() => {
        const styles = jsxStyleRegistry.styles()
        jsxStyleRegistry.flush()
        return <>{styles}</>
    })

    return <StyleRegistry registry={jsxStyleRegistry}>{children}</StyleRegistry>
}