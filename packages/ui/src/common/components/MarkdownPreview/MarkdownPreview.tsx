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
      <ReactMarkdown className="markdown-preview">{markdown}</ReactMarkdown>
    </>
  )
}
