import React from 'react'
import ReactMarkdown from 'react-markdown'

import { MarkdownPreviewStyles } from './MarkdownPreviewStyles'

export interface MarkdownPreviewProps {
  markdown: string
}

export const MarkdownPreview = ({ markdown }: MarkdownPreviewProps) => {
  return (
    <>
      <MarkdownPreviewStyles />
      <ReactMarkdown
        className="markdown-preview"
        components={{
          code: ({ children, inline }) => {
            if (inline) {
              return <code>{children}</code>
            }
            return <code>{children}</code>
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </>
  )
}
