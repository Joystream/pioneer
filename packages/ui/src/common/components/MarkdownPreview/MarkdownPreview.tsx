import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import ReactMarkdown, { PluggableList } from 'react-markdown'
import { Components, Position } from 'react-markdown/src/ast-to-react'
import { Root } from 'react-markdown/src/rehype-filter'

import { MarkdownPreviewStyles, MarkdownPreviewStylesProps } from './MarkdownPreviewStyles'

export interface MarkdownPreviewProps extends MarkdownPreviewStylesProps {
  markdown: string
  append?: ReactNode
}

export const MarkdownPreview = ({ markdown, append, ...styleProps }: MarkdownPreviewProps) => {
  const endsWithP = useRef(false)
  const [appendAfter, setAppendAfter] = useState(false)

  useEffect(() => {
    if (append) setAppendAfter(!endsWithP.current)
  }, [markdown, append])

  const rehypePlugins = useMemo((): PluggableList => {
    const checkEndWithP: PluggableList[0] = () => (tree) => {
      const children = (tree as Root).children
      const lastNode = children?.[children.length - 1]
      endsWithP.current = lastNode?.type === 'element' && lastNode?.tagName === 'p'
      return tree
    }
    return append ? [checkEndWithP] : []
  }, [markdown, append])

  const components = useMemo((): Components => {
    const shouldApend = (sourcePosition?: Position | null): boolean =>
      endsWithP.current && sourcePosition?.end?.offset === markdown.length

    const p: Components['p'] = ({ children, sourcePosition }) => (
      <p>
        {children}
        {shouldApend(sourcePosition) && <> {append}</>}
      </p>
    )
    return {
      ...(append ? { p } : {}),
      code: ({ children, inline }) => <code className={inline ? 'inline-code' : 'in-block-code'}>{children}</code>,
    }
  }, [markdown, append])

  return (
    <div className="markdown-preview">
      <MarkdownPreviewStyles {...styleProps} />
      <ReactMarkdown rehypePlugins={rehypePlugins} components={components} rawSourcePos>
        {markdown}
      </ReactMarkdown>
      {appendAfter && <p>{append}</p>}
    </div>
  )
}
