import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import ReactMarkdown, { Components } from 'react-markdown'
import { Position } from 'react-markdown/lib/ast-to-react'
import { PluggableList } from 'react-markdown/lib/react-markdown'
import { Root } from 'react-markdown/lib/rehype-filter'
import styled from 'styled-components'

import { TextInlineMedium } from '@/common/components/typography'

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
    const shouldAppend = (sourcePosition?: Position | null): boolean =>
      endsWithP.current && sourcePosition?.end?.offset === markdown.length

    const p: Components['p'] = ({ children, sourcePosition }) => (
      <p>
        {children}
        {shouldAppend(sourcePosition) && <> {append}</>}
      </p>
    )

    return {
      ...(append ? { p } : {}),

      a: ({ children, ...props }) => {
        const href = props.href as string | undefined
        const [memberId] = href?.match(/#mention\?member-id=(.+)$/) ?? []
        return memberId ? <Mention data-member-id={memberId}>{children}</Mention> : <a href={href}>{children}</a>
      },

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

const Mention = styled(TextInlineMedium).attrs({ bold: true })`
  text-transform: capitalize;
`
