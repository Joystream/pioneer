import React from 'react'
import ReactMarkdown from 'react-markdown'

import { TextBig, TextMedium, TextSmall } from './typography'

export const MarkdownPreview = ({ markdown }: { markdown: string }) => {
  return (
    <ReactMarkdown
      className="markdown-preview"
      components={{
        h3: (props) => <TextBig bold {...props} as="h3" />,
        h4: (props) => <TextMedium bold {...props} as="h4" />,
        p: (props) => <TextSmall {...props} />,
      }}
    >
      {markdown}
    </ReactMarkdown>
  )
}
