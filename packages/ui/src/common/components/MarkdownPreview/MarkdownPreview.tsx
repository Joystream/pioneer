import React from 'react'
import ReactMarkdown from 'react-markdown'
import { MarkdownPreviewStyles } from "./MarkdownPreviewStyles";

export const MarkdownPreview = ({ markdown }: { markdown: string }) => {
  return (
    <>
      <MarkdownPreviewStyles />
      <ReactMarkdown className="markdown-preview">
        {markdown}
      </ReactMarkdown>
    </>
  )
}
