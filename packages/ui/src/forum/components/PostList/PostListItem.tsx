import React, { forwardRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { BlockTime, BlockTimeWrapper } from '@/common/components/BlockTime'
import { ButtonGhost, ButtonsRow } from '@/common/components/buttons'
import { LinkButtonGhost } from '@/common/components/buttons/LinkButtons'
import { ContextMenu } from '@/common/components/ContextMenu'
import { ArrowReplyIcon, HeartIcon, LinkIcon, ReplyIcon } from '@/common/components/icons'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { Badge, TextInlineSmall } from '@/common/components/typography'
import { Colors, Transitions } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { relativeTime } from '@/common/model/relativeTime'
import { spacing } from '@/common/utils/styles'
import { DeletePostModalCall } from '@/forum/modals/DeletePostModal'
import { ForumPost } from '@/forum/types'
import { MemberInfo } from '@/memberships/components'

interface PostProps {
  post: ForumPost
  isSelected?: boolean
  isOwn?: boolean
  isPreview?: boolean
}

export const PostListItem = forwardRef<HTMLDivElement, PostProps>(({ post, isSelected, isOwn, isPreview }, ref) => {
  const { createdAtBlock, updatedAt, author, text, reaction, repliesTo } = post
  const edited = useMemo(() => updatedAt && <EditionTime>(edited {relativeTime(updatedAt)})</EditionTime>, [updatedAt])
  const { showModal } = useModal()

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
        <MarkdownPreview markdown={text} append={edited} size="s" />
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
          <LinkButton to={window.location.href} square disabled={isPreview} size="small">
            <LinkIcon />
          </LinkButton>
          <Button square disabled={isPreview} size="small">
            <ReplyIcon />
          </Button>
          {isOwn && (
            <ContextMenu
              size="small"
              items={[
                { text: 'Edit post', onClick: (event) => event?.preventDefault() },
                {
                  text: 'Delete post',
                  onClick: () => showModal<DeletePostModalCall>({ modal: 'DeletePost', data: { post } }),
                },
              ]}
            />
          )}
        </ButtonsRow>
      </ForumPostRow>
    </ForumPostStyles>
  )
})

const LinkButton = styled(LinkButtonGhost).attrs({ size: 'small' })``
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

const EditionTime = styled(TextInlineSmall).attrs({ lighter: true, italic: true })``

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

const ForumPostAuthor = styled.div``

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
