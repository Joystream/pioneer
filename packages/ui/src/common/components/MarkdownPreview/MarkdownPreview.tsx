import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import ReactMarkdown, { Components } from 'react-markdown'
import { Position } from 'react-markdown/lib/ast-to-react'
import { PluggableList } from 'react-markdown/lib/react-markdown'
import { Root } from 'react-markdown/lib/rehype-filter'
import remarkGfm from 'remark-gfm'
import styled from 'styled-components'

import { Mention, MentionType } from '@/common/components/Mention'
import { UserImage } from '@/common/components/UserImage/UserImage'

import { ModeratedItem } from '../ModeratedItem'

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
        const match = href?.match(/#mention\?(.+)=(.+)$/) ?? []
        const type = mentionTypesMap[match[1]]
        return type && match[2] ? (
          <Mention itemId={match[2]} type={type}>
            {children}
          </Mention>
        ) : (
          <a style={{ overflowWrap: 'break-word' }} href={href} rel="noopener noreferrer" target="_blank">
            {children}
          </a>
        )
      },
      img: (props) => (
        <MarkdownImage
          src={props.src}
          fallbackComponent={<ModeratedItem title="This image was removed by a moderator" />}
        />
      ),
      code: ({ children, inline }) => <code className={inline ? 'inline-code' : 'in-block-code'}>{children}</code>,
    }
  }, [markdown, append])

  const stripBackslashes = (text: string) => text.replace(/\\(.)/gm, '$1')
  return (
    <div className="markdown-preview">
      <MarkdownPreviewStyles {...styleProps} />
      <ReactMarkdown rehypePlugins={rehypePlugins} remarkPlugins={[remarkGfm]} components={components} rawSourcePos>
        {stripBackslashes(markdown)}
      </ReactMarkdown>
      {appendAfter && <p>{append}</p>}
    </div>
  )
}

const MarkdownImage = styled(UserImage)`
  max-width: 100%;
  max-height: 400px;
`

const mentionTypesMap: Record<string, MentionType> = {
  'member-id': 'member',
  'proposal-id': 'proposal',
  'proposal-post-id': 'proposalDiscussionEntry',
  'thread-id': 'forumThread',
  'forum-post-id': 'forumPost',
  'application-id': 'application',
  'opening-id': 'opening',
}
