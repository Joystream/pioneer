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
              return <code className="inline-code">{children}</code>
            }
            return <code className="in-block-code">{children}</code>
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </>
  )
}
