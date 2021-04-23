import React from 'react'
import ReactMarkdown from 'react-markdown'

export const MarkdownPreview = ({ markdown }: { markdown: string }) => <ReactMarkdown>{markdown}</ReactMarkdown>
