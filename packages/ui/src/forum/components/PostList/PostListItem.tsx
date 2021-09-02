import React, { RefObject, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router'
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
import { Colors, Fonts, Transitions } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { useRouteQuery } from '@/common/hooks/useRouteQuery'
import { relativeIfRecent } from '@/common/model/relativeIfRecent'
import { PostHistoryModalCall } from '@/forum/modals/PostHistoryModal'
import { ForumPost } from '@/forum/types'
import { MemberInfo } from '@/memberships/components'

import { LikeButton } from '../threads/LikeButton'

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
}

export const PostListItem = ({ post, isSelected, isPreview, isThreadActive, insertRef, type }: PostListItemProps) => {
  const { createdAtBlock, updatedAt, author, text, reaction, repliesTo, id } = post

  const location = useLocation()
  const query = useRouteQuery()
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
  const postLink = useMemo(() => {
    query.set('post', id)

    return window.location.origin + (window.location.hash ? '/#' : '') + location.pathname + '?' + query.toString()
  }, [location.search, location.pathname, id])

  const likesCount = reaction ? reaction.length : 0

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
        {editing ? (
          <PostEditor post={post} onCancel={() => setEditing(false)} type={type} />
        ) : (
          <MarkdownPreview markdown={text} append={editionTime} size="s" />
        )}
      </MessageBody>
      <ForumPostRow>
        {!editing && (
          <>
            <ButtonsGroup>
              <LikeButton disabled={!isThreadActive} counter={likesCount} />
            </ButtonsGroup>
            <ButtonsGroup>
              <CopyButtonTemplate
                textToCopy={postLink}
                square
                size="small"
                disabled={isPreview}
                icon={<LinkIcon />}
                title="Copy link"
              />
              {isThreadActive && (
                <>
                  <ButtonGhost square disabled={isPreview} size="small" title="Reply">
                    <ReplyIcon />
                  </ButtonGhost>
                  <PostContextMenu post={post} onEdit={() => setEditing(true)} type={type} />
                </>
              )}
            </ButtonsGroup>
          </>
        )}
      </ForumPostRow>
    </ForumPostStyles>
  )
}

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

export const ForumPostStyles = styled.div<Pick<PostListItemProps, 'isSelected'>>`
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
