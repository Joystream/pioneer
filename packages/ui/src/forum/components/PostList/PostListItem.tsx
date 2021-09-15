import React, { RefObject, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { BlockTime, BlockTimeWrapper } from '@/common/components/BlockTime'
import {
  ButtonGhost,
  ButtonsGroup,
  ButtonInnerWrapper,
  ButtonLink,
  CopyButtonTemplate,
} from '@/common/components/buttons'
import { ArrowReplyIcon, LinkIcon, ReplyIcon } from '@/common/components/icons'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { Badge } from '@/common/components/typography'
import { Colors, Fonts, BorderRad, Shadows } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { relativeIfRecent } from '@/common/model/relativeIfRecent'
import { PostHistoryModalCall } from '@/forum/modals/PostHistoryModal'
import { ForumPost } from '@/forum/types'
import { MemberInfo } from '@/memberships/components'

import { PostContextMenu } from './PostContextMenu'
import { PostEditor } from './PostEditor'

export type PostListItemType = 'forum' | 'proposal'

interface PostListItemProps {
  post: ForumPost
  isSelected?: boolean
  isPreview?: boolean
  isThreadActive?: boolean
  insertRef?: (ref: RefObject<HTMLDivElement>) => void
  type: PostListItemType
  replyToPost: () => void
  link?: string
}

export const PostListItem = ({
  post,
  isSelected,
  isPreview,
  isThreadActive,
  insertRef,
  type,
  link,
  replyToPost,
}: PostListItemProps) => {
  const { createdAtBlock, updatedAt, author, text, repliesTo } = post

  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    !!ref.current && insertRef && insertRef(ref)
  }, [ref.current])
  const [editing, setEditing] = useState(false)
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
    <FroumPostBlock ref={ref} isSelected={isSelected}>
      <ForumPostStyles>
        <ForumPostRow>
          <ForumPostAuthor>{author && <MemberInfo member={author} />}</ForumPostAuthor>
          {createdAtBlock && <BlockTime block={createdAtBlock} layout="reverse" />}
        </ForumPostRow>
        <MessageBody>
          {repliesTo && (
            <Reply>
              <ReplyBadge>
                <div>
                  <ArrowReplyIcon />{' '}
                  <Badge>
                    <Link to={window.location.href}>Replies to {repliesTo?.author?.handle}</Link>
                  </Badge>
                </div>
              </ReplyBadge>
              <MarkdownPreview markdown={repliesTo.text} size="s" isReply />
            </Reply>
          )}
          {editing ? (
            <PostEditor post={post} onCancel={() => setEditing(false)} type={type} />
          ) : (
            <MarkdownPreview markdown={text} append={editionTime} size="s" />
          )}
        </MessageBody>
        <ForumPostRow>
          {!editing && (
            <ButtonsGroup>
              <CopyButtonTemplate
                textToCopy={link}
                square
                size="small"
                disabled={isPreview}
                icon={<LinkIcon />}
                title="Copy link"
              />
              {isThreadActive && (
                <>
                  <ButtonGhost square disabled={isPreview} size="small" title="Reply" onClick={replyToPost}>
                    <ReplyIcon />
                  </ButtonGhost>
                  <PostContextMenu post={post} onEdit={() => setEditing(true)} type={type} />
                </>
              )}
            </ButtonsGroup>
          )}
        </ForumPostRow>
      </ForumPostStyles>
    </FroumPostBlock>
  )
}

const MessageBody = styled.div`
  grid-column: span 2;
  margin-top: 8px;
`

export const Reply = styled.blockquote`
  background-color: ${Colors.Black[75]};
  font-style: italic;
  margin: 0 0 12px;
  padding: 8px;

  & .markdown-preview p,
  & p {
    font-size: 12px;
  }
`

export const ReplyBadge = styled.div`
  display: flex;
  align-items: center;
  font-style: normal;
  margin-bottom: 10px;
  justify-content: space-between;

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

const EditionTime = styled(ButtonLink).attrs({ size: 'small', borderless: true })`
  display: inline-flex;
  padding-right: 1px;
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
  font-style: italic;
  font-family: ${Fonts.Inter};
  color: ${Colors.Black[400]};

  ${ButtonInnerWrapper} {
    transform: translateY(0);
  }
`

export const ForumPostStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 16px;
`

const FroumPostBlock = styled.div<Pick<PostListItemProps, 'isSelected'>>`
  border-radius: ${BorderRad.m};
  background-color: ${Colors.White};
  box-shadow: ${Shadows.light};
  padding: 24px;
  scroll-margin: 48px;

  // Animate selection:
  &,
  ${Reply} {
    animation: ${({ isSelected }) => (isSelected ? 'flashSelection' : 'none')} 1.5s ease-in-out;
  }

  @keyframes flashSelection {
    25%,
    75% {
      background-color: ${Colors.Blue[100]};
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
