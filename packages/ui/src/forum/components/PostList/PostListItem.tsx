import { differenceInHours } from 'date-fns'
import React, { forwardRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { BlockTime, BlockTimeWrapper } from '@/common/components/BlockTime'
import { ButtonGhost, ButtonsRow, CopyButtonTemplate } from '@/common/components/buttons'
import { ArrowReplyIcon, HeartIcon, LinkIcon, ReplyIcon } from '@/common/components/icons'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { Badge, TextInlineSmall } from '@/common/components/typography'
import { Colors, Transitions } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { formatDateString } from '@/common/model/formatters'
import { relativeTime } from '@/common/model/relativeTime'
import { spacing } from '@/common/utils/styles'
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
  const time = useMemo(() => {
    if (!updatedAt) {
      return null
    }

    return (
      <EditionTime
        onClick={() =>
          showModal<PostHistoryModalCall>({ modal: 'PostHistory', data: { postId: post.id, author: author } })
        }
      >
        (edited{' '}
        {differenceInHours(new Date(), new Date(updatedAt)) >= 24
          ? formatDateString(updatedAt)
          : relativeTime(updatedAt)}
        )
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
        <MarkdownPreview markdown={text} append={time} size="s" />
      </MessageBody>
      <ForumPostRow>
        {reaction && (
          <ButtonsRow>
            <Button size="small">
              <HeartIcon />
              {!!reaction.length && reaction.length}
            </Button>
          </ButtonsRow>
        )}
        <ButtonsRow>
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
        </ButtonsRow>
      </ForumPostRow>
    </ForumPostStyles>
  )
})

const Button = styled(ButtonGhost).attrs({ size: 'small' })``

const MessageBody = styled.div`
  grid-column: span 2;
  margin-top: ${spacing(1)};
`

const Reply = styled.blockquote`
  background-color: ${Colors.Black[75]};
  font-style: italic;
  margin: 0 0 ${spacing(3 / 2)};
  padding: ${spacing(1)};

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
    padding: 0 ${spacing(1)};
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
  row-gap: ${spacing(2)};

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

  ${ForumPostAuthor}, ${ButtonsRow}, ${BlockTimeWrapper} {
    flex: 50%;
  }

  ${ForumPostAuthor}, ${ButtonsRow}:first-of-type {
    justify-content: flex-start;
  }

  ${BlockTimeWrapper}, ${ButtonsRow}:last-of-type {
    justify-content: flex-end;
  }
`
