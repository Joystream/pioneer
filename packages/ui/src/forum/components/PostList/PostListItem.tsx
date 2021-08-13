import React, { forwardRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { BlockTime, BlockTimeWrapper } from '@/common/components/BlockTime'
import { ButtonGhost, ButtonsGroup, CopyButtonTemplate } from '@/common/components/buttons'
import { ArrowReplyIcon, HeartIcon, LinkIcon, ReplyIcon } from '@/common/components/icons'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { Badge, TextInlineSmall } from '@/common/components/typography'
import { Colors, Transitions } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { relativeIfRecent } from '@/common/model/relativeIfRecent'
import { PostHistoryModalCall } from '@/forum/modals/PostHistoryModal'
import { ForumPost } from '@/forum/types'
import { MemberInfo } from '@/memberships/components'

import { PostContextMenu } from './PostContextMenu'

interface PostProps {
  post: ForumPost
  isSelected?: boolean
  isPreview?: boolean
}

export const PostListItem = forwardRef<HTMLDivElement, PostProps>(({ post, isSelected, isPreview }, ref) => {
  const { createdAtBlock, updatedAt, author, text, reaction, repliesTo } = post
  const { showModal } = useModal()
  const editionTime = useMemo(() => {
    if (!updatedAt) {
      return null
    }

    return (
      <EditionTime
        onClick={() =>
          showModal<PostHistoryModalCall>({ modal: 'PostHistory', data: { postId: post.id, author: author } })
        }
      >
        (edited {relativeIfRecent(updatedAt)})
      </EditionTime>
    )
  }, [updatedAt])

  return (
    <ForumPostStyles ref={ref} isSelected={isSelected}>
      <ForumPostRow>
        <ForumPostAuthor>{author && <MemberInfo member={author} />}</ForumPostAuthor>
        {createdAtBlock && <BlockTime block={createdAtBlock} layout="reverse" />}
      </ForumPostRow>
      <MessageBody>
        {repliesTo && (
          <Reply>
            <ReplyBadge>
              <ArrowReplyIcon />{' '}
              <Badge>
                <Link to={window.location.href}>Replies to {repliesTo?.author?.handle}</Link>
              </Badge>
            </ReplyBadge>
            <MarkdownPreview markdown={repliesTo.text} size="s" isReply />
          </Reply>
        )}
        <MarkdownPreview markdown={text} append={editionTime} size="s" />
      </MessageBody>
      <ForumPostRow>
        <ButtonsGroup>
          {reaction && (
            <Button size="small">
              <HeartIcon />
              {!!reaction.length && reaction.length}
            </Button>
          )}
          <CopyButtonTemplate
            textToCopy={window.location.href}
            square
            size="small"
            disabled={isPreview}
            icon={<LinkIcon />}
          />
          <Button square disabled={isPreview}>
            <ReplyIcon />
          </Button>
          <PostContextMenu post={post} />
        </ButtonsGroup>
      </ForumPostRow>
    </ForumPostStyles>
  )
})

const Button = styled(ButtonGhost).attrs({ size: 'small' })``

const MessageBody = styled.div`
  grid-column: span 2;
  margin-top: 8px;
`

const Reply = styled.blockquote`
  background-color: ${Colors.Black[75]};
  font-style: italic;
  margin: 0 0 12px;
  padding: 8px;

  & .markdown-preview p,
  & p {
    font-size: 12px;
  }
`

const ReplyBadge = styled.div`
  display: flex;
  align-items: center;
  font-style: normal;
  margin-bottom: 10px;

  svg {
    height: 11px;
  }

  ${Badge} {
    background-color: ${Colors.Blue[100]};
    margin: 1px 0 0 3px;
    padding: 0 8px;
  }

  a {
    color: ${Colors.Blue[500]};
    text-transform: uppercase;
  }
`

const EditionTime = styled(TextInlineSmall).attrs({ lighter: true, italic: true })`
  float: right;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export const ForumPostStyles = styled.div<Pick<PostProps, 'isSelected'>>`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 16px;

  // Animate selection:
  &,
  ${Reply} {
    animation: ${({ isSelected }) => (isSelected ? 'flashSelection' : 'none')} ${Transitions.duration} ease;
  }

  @keyframes flashSelection {
    50% {
      background-color: ${Colors.Orange[400]};
    }
  }
`

export const ForumPostAuthor = styled.div``

export const ForumPostRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  ${ForumPostAuthor}, ${ButtonsGroup}, ${BlockTimeWrapper} {
    flex: 50%;
  }

  ${ForumPostAuthor}, ${ButtonsGroup}:first-of-type {
    justify-content: flex-start;
  }

  ${BlockTimeWrapper}, ${ButtonsGroup}:last-of-type {
    justify-content: flex-end;
  }
`
